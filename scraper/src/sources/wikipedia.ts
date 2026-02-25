import { Radio, RadioCategory } from '../types/radio';
import axios from 'axios';
import * as cheerio from 'cheerio';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

export async function scrapeWikipedia(): Promise<Partial<Radio>[]> {
  try {
    const { data } = await axios.get('https://es.wikipedia.org/wiki/Radio_Cubana', {
      headers: { 'User-Agent': USER_AGENT }
    });
    const $ = cheerio.load(data);
    const radios: Partial<Radio>[] = [];

    // Buscar tablas con clase 'wikitable'
    $('table.wikitable').each((_, table) => {
      $(table).find('tr').each((i, row) => {
        if (i === 0) return; // saltar cabecera
const cells = $(row).find('td');
if (cells.length >= 2) {
  const title = $(cells[0]).text().trim();
  if (title && !title.includes('Logo')) {
    let province: string | undefined;
    let municipality: string | undefined;
    let description: string | undefined;

    // Asignar según longitud
    if (cells.length > 1) {
      const cell1 = $(cells[1]).text().trim();
      if (cell1.length < 50) province = cell1;
      else description = cell1;
    }
    if (cells.length > 2) {
      const cell2 = $(cells[2]).text().trim();
      if (cell2.length < 50) municipality = cell2;
      else description = description ? description + ' ' + cell2 : cell2;
    }
    // Concatenar celdas restantes a descripción
    for (let i = 3; i < cells.length; i++) {
      const extra = $(cells[i]).text().trim();
      if (extra) description = description ? description + ' ' + extra : extra;
    }

    // Categoría inferida del texto
    const rowText = $(row).text().toLowerCase();
    let category: RadioCategory = 'MUNICIPAL';
    if (rowText.includes('nacional')) category = 'NACIONAL';
    else if (rowText.includes('provincial')) category = 'PROVINCIAL';
    else if (rowText.includes('internacional')) category = 'INTERNACIONAL';

    radios.push({
      title,
      category,
      province,
      municipality,
      description,
      country: 'Cuba',
    });
  }
}
      });
    });

    return radios;
  } catch (error) {
    console.error('Error scraping Wikipedia:', error);
    return [];
  }
}

export async function fetchWikipediaData(title: string): Promise<{ description: string; imageUrl?: string } | null> {
  try {
    const url = 'https://es.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title);
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': USER_AGENT }
    });
    if (data && data.extract) {
      return {
        description: data.extract,
        imageUrl: data.thumbnail?.source,
      };
    }
  } catch (error) {
    // ignorar
  }
  return null;
}

export async function searchWikipediaForRadio(title: string): Promise<string | null> {
  const searchUrl = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(title + " radio")}&format=json&origin=*`;
  const response = await axios.get(searchUrl, { headers: { 'User-Agent': USER_AGENT } });
  const pages = response.data.query.search;
  if (pages && pages.length > 0) {
    return pages[0].title; // Título del primer resultado
  }
  return null;
}