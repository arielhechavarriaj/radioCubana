import axios from 'axios';
import * as cheerio from 'cheerio';
import { Radio, RadioCategory } from '../types/radio';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';
const BASE_URL = 'https://www.radiocubana.cu/emisoras/';

export async function scrapePortalList(): Promise<Partial<Radio>[]> {
  const radios: Partial<Radio>[] = [];
  let currentPage = 1;
  let hasMorePages = true;

  while (hasMorePages) {
    try {
      const url = currentPage === 1 ? BASE_URL : `${BASE_URL}page/${currentPage}/`;
      console.log(`🔍 Scrapeando página ${currentPage}...`);

      const { data } = await axios.get(url, {
        headers: { 'User-Agent': USER_AGENT }
      });

      const $ = cheerio.load(data);
      const items = $('.ultp-block-item');

      if (items.length === 0) {
        hasMorePages = false;
        break;
      }

      items.each((_, element) => {
        // Título limpiado
        const title = $(element).find('.ultp-block-title a').text()
          .replace(/\s*\|.*$/, '')
          .trim();
        if (!title) return;

        // Categoría
        const categoryElement = $(element).find('.ultp-category-grid a');
        const categoryText = categoryElement.text().trim();
        let category: RadioCategory = 'MUNICIPAL';
        if (categoryText.toLowerCase().includes('nacional')) category = 'NACIONAL';
        else if (categoryText.toLowerCase().includes('provincial')) category = 'PROVINCIAL';
        else if (categoryText.toLowerCase().includes('internacional')) category = 'INTERNACIONAL';

        // URL de detalle (por si luego queremos scrapear el audio)
        const detailUrl = $(element).find('.ultp-block-title a').attr('href');

        // Dentro del each
        const excerpt = $(element).find('.ultp-block-excerpt').text().trim();
        if (excerpt) {
          // Puede contener HTML, lo limpiamos
          const cleanExcerpt = excerpt.replace(/<[^>]*>/g, '').trim();
          // Lo añadimos al objeto radio
          radios.push({
            title,
            category,
            country: 'Cuba',
            description: cleanExcerpt,
          });
        } else {
          radios.push({
            title,
            category,
            country: 'Cuba',
          });
        }
      });

      // Verificar si hay página siguiente
      const nextPageLink = $('.ultp-next-page-numbers a').attr('href') || $('a:contains("Next")').attr('href');
      if (nextPageLink) {
        currentPage++;
      } else {
        hasMorePages = false;
      }

    } catch (error) {
      console.error(`Error en página ${currentPage}:`, error);
      hasMorePages = false;
    }
  }

  console.log(`📻 Total emisoras encontradas en portal: ${radios.length}`);
  return radios;
}