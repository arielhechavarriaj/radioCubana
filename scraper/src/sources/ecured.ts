import axios from 'axios';
import * as cheerio from 'cheerio';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

// Normaliza un string: quita acentos, convierte a minúsculas y elimina espacios extras
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // elimina acentos
    .replace(/[^\w\s]/g, ' ') // reemplaza caracteres no alfanuméricos por espacios
    .replace(/\s+/g, ' ')
    .trim();
}

// Obtiene la lista de artículos de la categoría "Emisoras de radio de Cuba"
export async function scrapeEcuredList(): Promise<{ title: string; url: string }[]> {
  try {
    const url = 'https://www.ecured.cu/Categor%C3%ADa:Emisoras_de_radio_de_Cuba';
    const { data } = await axios.get(url, { headers: { 'User-Agent': USER_AGENT } });
    const $ = cheerio.load(data);
    const results: { title: string; url: string }[] = [];

    $('.mw-category-group a').each((_, element) => {
      const title = $(element).text().trim();
      const href = $(element).attr('href');
      if (title && href && !title.includes('Categoría') && !title.includes('Página')) {
        results.push({
          title,
          url: href.startsWith('http') ? href : `https://www.ecured.cu${href}`,
        });
      }
    });

    console.log(`📻 Encontradas ${results.length} emisoras en EcuRed (lista)`);
    return results;
  } catch (error) {
    console.error('Error scraping EcuRed list:', error);
    return [];
  }
}

// Extrae la descripción e imagen de un artículo de EcuRed
export async function scrapeEcuredArticle(articleUrl: string): Promise<{ description: string; imageUrl?: string } | null> {
  try {
    const { data } = await axios.get(articleUrl, { headers: { 'User-Agent': USER_AGENT } });
    const $ = cheerio.load(data);

    // Intentar obtener descripción: puede estar en el primer párrafo con contenido significativo
    let description = '';
    $('p').each((_, p) => {
      const text = $(p).text().trim();
      if (text && text.length > 20 && !description) {
        description = text;
      }
    });

    // Si no hay párrafos largos, intentar con el resumen inicial (a veces en un div)
    if (!description) {
      const summary = $('.mw-parser-output').find('p').first().text().trim();
      if (summary && summary.length > 20) description = summary;
    }

    // Buscar imagen principal
    let imageUrl = '';
    const imgSelectors = [
      '.infobox img',
      '.thumbimage',
      '.image img',
      '.mw-file-element',
      'table.infobox img',
    ];
    for (const selector of imgSelectors) {
      const img = $(selector).first();
      if (img.length) {
        let src = img.attr('src') || img.attr('data-src') || '';
        if (src && !src.startsWith('http')) {
          src = 'https://www.ecured.cu' + src;
        }
        imageUrl = src;
        break;
      }
    }

    return { description, imageUrl };
  } catch (error) {
    console.error(`Error scraping EcuRed article ${articleUrl}:`, error);
    return null;
  }
}

// Busca en la lista de EcuRed el artículo más relevante para un título dado
export function findBestEcuredMatch(
  title: string,
  ecuredList: { title: string; url: string }[]
): string | null {
  const normalizedTitle = normalizeString(title);

  // Primero, búsqueda exacta (después de normalizar)
  for (const item of ecuredList) {
    const normalizedItem = normalizeString(item.title);
    if (normalizedItem === normalizedTitle) {
      return item.url;
    }
  }

  // Si no hay exacta, buscar por inclusión (que el título normalizado contenga la palabra "radio" y parte del nombre)
  const titleWords = normalizedTitle.split(' ');
  for (const item of ecuredList) {
    const normalizedItem = normalizeString(item.title);
    // El título de EcuRed debe contener al menos dos palabras significativas del título original
    let matchCount = 0;
    for (const word of titleWords) {
      if (word.length > 3 && normalizedItem.includes(word)) matchCount++;
    }
    // Si coincide al menos 2 palabras (o todas si el título es corto), lo tomamos
    if (matchCount >= 2 || (titleWords.length === 1 && matchCount >= 1)) {
      return item.url;
    }
  }

  return null;
}