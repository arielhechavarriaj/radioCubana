import { scrapeWikipedia,fetchWikipediaData,searchWikipediaForRadio } from './sources/wikipedia';
import { scrapePortalList } from './sources/portalList';
import { scrapeEcuredList, scrapeEcuredArticle,findBestEcuredMatch } from './sources/ecured';
import { getUrlForTitle } from './utils/urlPatterns';
import { Radio } from './types/radio';
import fs from 'fs/promises';
import path from 'path';

async function main() {
  console.log('🕷️ Iniciando scraper de Radio Cubana...');

  // 1. Obtener listas
  const [wikiRadios, portalRadios] = await Promise.all([
    scrapeWikipedia(),
    scrapePortalList(),
  ]);

  console.log(`📻 Wikipedia: ${wikiRadios.length} emisoras`);
  console.log(`📻 Portal: ${portalRadios.length} emisoras`);

  // 2. Combinar y eliminar duplicados (por título normalizado)
  const allRadios = [...wikiRadios, ...portalRadios];
  const uniqueMap = new Map<string, Partial<Radio>>();

  for (const r of allRadios) {
    if (r.title) {
      const key = r.title.toLowerCase().replace(/\s+/g, ' ').trim();
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, r);
      } else {
        const existing = uniqueMap.get(key)!;
        // Conserva provincia y municipio si no existen
        if (!existing.province && r.province) existing.province = r.province;
        if (!existing.municipality && r.municipality) existing.municipality = r.municipality;
        // La categoría: prioriza la más específica
        const catOrder = { 'NACIONAL': 3, 'PROVINCIAL': 2, 'MUNICIPAL': 1, 'INTERNACIONAL': 4 };
        if (r.category && catOrder[r.category] > catOrder[existing.category || 'MUNICIPAL']) {
          existing.category = r.category;
        }
        // El título: si el nuevo título es más largo (contiene más palabras), lo conservamos
        if (r.title && r.title.length > existing.title!.length) {
          existing.title = r.title;
        }
        // Descripción: priorizar la más larga
        if (r.description && (!existing.description || r.description.length > existing.description.length)) {
          existing.description = r.description;
        }
      }
    }
  }

  const uniqueRadios = Array.from(uniqueMap.values());
  console.log(`📻 Total únicas: ${uniqueRadios.length}`);

  // 3. Enriquecer con datos de EcuRed y Wikipedia
  console.log(`📻 Obteniendo datos de EcuRed y Wikipedia...`);

  // Primero, obtener lista de EcuRed con URLs
  const ecuredList = await scrapeEcuredList();

  // Procesar cada radio para enriquecer
  const enrichedRadios: Partial<Radio>[] = [];

    for (let i = 0; i < uniqueRadios.length; i++) {
      const r = uniqueRadios[i];
      const lowerTitle = r.title?.toLowerCase().trim() || '';

      let description = r.description;
      let imageUrl: string | undefined;


  // 1. Intentar con EcuRed
const ecuredUrl = findBestEcuredMatch(lowerTitle || '', ecuredList);
if (ecuredUrl) {
  const ecuredData = await scrapeEcuredArticle(ecuredUrl);
  if (ecuredData) {
    description = ecuredData.description || description;
    imageUrl = ecuredData.imageUrl;
  }
}

      // 2. Si no hay descripción aún, intentar Wikipedia
if (!description && r.title) {
  // Intentar búsqueda en Wikipedia
  const searchTitle = await searchWikipediaForRadio(r.title);
  if (searchTitle) {
    const wikiData = await fetchWikipediaData(searchTitle);
    if (wikiData) {
      description = wikiData.description;
      imageUrl = imageUrl || wikiData.imageUrl;
    }
  }
}

      enrichedRadios.push({
        ...r,
        description,
        imageUrl,
      });

      if (i % 5 === 0) await new Promise(resolve => setTimeout(resolve, 1000));
    }

  // 4. Asignar URLs y construir array final (sin nulos)
  const radios: Radio[] = [];

  for (let i = 0; i < enrichedRadios.length; i++) {
    const r = enrichedRadios[i];
    const url = getUrlForTitle(r.title || '');
    if (!url) continue;

    const radio: Radio = {
      id: `radio-${i + 1}`,
      title: r.title || 'Desconocida',
      category: r.category || 'MUNICIPAL',
      audioUrl: url,
      country: 'Cuba',
      active: true,
      imageUrl: r.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.title || 'Radio')}&background=random&length=2&size=128`,
      description: r.description,
    };

    // Solo agregar si existen
    if (r.province) radio.province = r.province;
    if (r.municipality) radio.municipality = r.municipality;

    radios.push(radio);
  }

  // 5. Guardar archivos
  const outputPath = path.join(__dirname, '../../frontend/src/data/radios.ts');
  const fileContent = `// Generado automáticamente el ${new Date().toLocaleString()}
import { Radio } from '../types/radio';

export const radios: Radio[] = ${JSON.stringify(radios, null, 2)};
`;

  await fs.writeFile(outputPath, fileContent, 'utf-8');
  console.log(`✅ Archivo radios.ts generado con ${radios.length} emisoras`);

  const jsonPath = path.join(__dirname, '../output/radios.json');
  await fs.writeFile(jsonPath, JSON.stringify(radios, null, 2), 'utf-8');
  console.log(`✅ JSON guardado en ${jsonPath}`);
}

main().catch(console.error);