const urlMap: Record<string, string> = {
  'Radio Habana Cuba': 'https://icecast.teveo.cu/McW3fLhs',
  'Radio Rebelde': 'https://icecast.teveo.cu/zrXXWK9F',
  'Radio Reloj': 'https://icecast.teveo.cu/b3jbfThq',
  'Radio Progreso': 'https://icecast.teveo.cu/XjfW7qWN',
  'CMBF Radio Musical Nacional': 'https://icecast.teveo.cu/Nbtz7HT3',
  'Radio Enciclopedia': 'https://icecast.teveo.cu/4XcL3hMp',
  'Radio Taíno': 'https://icecast.teveo.cu/3MCwWg3V',
  'Radio Sancti Spíritus': 'https://icecast.teveo.cu/NqWrgw7j',
  'Radio Surco': 'https://icecast.teveo.cu/F9tgnJVT',
  'Radio Cadena Agramonte': 'https://icecast.teveo.cu/j99xztkT',
  'Radio Victoria': 'https://icecast.teveo.cu/P77NJX4X',
  'Radio Angulo': 'https://icecast.teveo.cu/hmVcdgM7',
  'Radio Bayamo': 'https://icecast.teveo.cu/7hdNcTbM',
  'Radio CMKC Revolución': 'https://icecast.teveo.cu/C9vVPN7h',
  'Radio Metropolitana': 'https://icecast.teveo.cu/ktW3mW74',
  'Radio COCO': 'https://icecast.teveo.cu/fvc4RVRz',
  'Radio Cadena Habana': 'https://icecast.teveo.cu/Jdq3Rbrg',
  'Radio Ciudad de La Habana': 'https://icecast.teveo.cu/g73XCjCH',
  'Radio 26': 'https://icecast.teveo.cu/LsxKNz7b',
  'Radio CMHW': 'https://icecast.teveo.cu/TsxMM94R',
  'Radio Ciudad del Mar': 'https://icecast.teveo.cu/CL7jRXqn',
  'Radio Caribe': 'https://icecast.teveo.cu/dXhtHs4P',
  'Radio Artemisa': 'https://icecast.teveo.cu/9HzjRcjX',
  'Radio Mayabeque': 'https://icecast.teveo.cu/Rsrm7P9h',
  'Radio Jaruco': 'https://icecast.teveo.cu/KH9tVwrC',
  'Radio Vitral': 'https://icecast.teveo.cu/7NgVjcqX',
  'Radio Chaparra': 'https://icecast.teveo.cu/tW3JjWph',
  'Radio SG La Voz del Azúcar': 'https://icecast.teveo.cu/TqqKTLP9',
  'Radio La voz de la Victoria': 'https://icecast.teveo.cu/7XPwcVbL',
  'Radio La Voz del Litoral': 'https://icecast.teveo.cu/Nr3dhCLf',
  'Radio Trinidad': 'https://icecast.teveo.cu/pxPv4cWR',
  'Radio Majaguabo': 'https://icecast.teveo.icrt.cu/7P4nbVPK',
  'Radio Caibarién': 'https://icecast.teveo.icrt.cu/srJ4vqkv',
  'Radio Esmeralda': 'https://icecast.teveo.cu/NnvHhH9z',
  'Radio Jiguaní': 'https://icecast.teveo.cu/nkz3TCfR',
  'Radio 8SF': 'https://icecast.teveo.cu/gFnFt4qK',
  'Radio Arimao': 'https://icecast.teveo.icrt.cu/4fNcwkpC',
  'Radio Camagüey': 'https://icecast.teveo.cu/3gnbjHVF',
  'Radio Portada de la Libertad': 'https://icecast.teveo.icrt.cu/mN9kqbNs',
  'Radio Sonido SM': 'https://icecast.teveo.cu/HmwFH4V4',
  'Radio Placetas': 'https://icecast.teveo.cu/wnW3hTrw',
  'Radio Florida': 'https://icecast.teveo.icrt.cu/4N4Mfsgd',
  'Radio Sierra Maestra': 'https://icecast.teveo.cu/wcdnsH3K',
  'Radio Mambí': 'https://icecast.teveo.cu/f3Hnc9tP',
  'Radio Sagua': 'https://icecast.teveo.icrt.cu/wHm3qrMx',
  'Radio Titán': 'https://icecast.teveo.cu/nXwsVz4N',
  'Radio Victoria de Girón': 'https://icecast.teveo.cu/cgMTxX9V',
  'Radio Morón': 'https://icecast.teveo.cu/jJ4JV3FK',
  'Radio Granma': 'https://icecast.teveo.cu/9RLhkmRH',
  'Radio Baraguá': 'https://icecast.teveo.cu/3CMM7zph',
  'Radio Varadero': 'https://icecast.teveo.cu/jWCmP3Fj',
  'Radio Amanecer': 'https://icecast.teveo.cu/HpM9FCwR',
  'Radio Vertientes': 'https://icecast.teveo.icrt.cu/7mw4Jvfh',
  'Radio La Voz del Níquel': 'https://icecast.teveo.cu/nj4PLTHR',
  'Radio Maisí, La Voz del Sol': 'https://icecast.teveo.icrt.cu/3xW3qJdm',
  'Radio Camoa': 'https://icecast.teveo.cu/7vCk4tnh',
  'Radio Jatibonico': 'https://icecast.teveo.cu/hW7WL4v9',
  'Radio Maboas': 'https://icecast.teveo.cu/9rbrvFpg',
  'Radio Ecos de Sagua': 'https://icecast.teveo.cu/3vfVjmNm',
  'Radio Fomento': 'https://icecast.teveo.cu/XzFz3xdK',
  'Radio Triple M Oriental': 'https://icecast.teveo.icrt.cu/Rmn7jcf9',
  'AGUADA RADIO': 'https://icecast.teveo.cu/qpMCfv3f',
  'Radio Nuevitas': 'https://icecast.teveo.cu/9VVnwcww',
  'Radio Gibara, La Voz del Atlántico': 'https://icecast.teveo.cu/KLp4WrKL',
  'RADIO BAHÍA': 'https://icecast.teveo.cu/PKWhw37L',
  'Radio Minas': 'https://icecast.teveo.cu/X9XNRkW4',
  'Radio Cruces': 'https://icecast.teveo.icrt.cu/pLC7FJpp',
};

export function getUrlForTitle(title: string): string | null {
  // Limpiar título: quitar "| Audio en Vivo", "| Audio", etc.
  const cleanTitle = title.replace(/\s*\|.*$/, '').trim();

  // Búsqueda exacta
  if (urlMap[cleanTitle]) return urlMap[cleanTitle];

  // Búsqueda por inclusión (por si el título extraído tiene texto adicional)
  for (const [key, url] of Object.entries(urlMap)) {
    if (cleanTitle.includes(key) || key.includes(cleanTitle)) return url;
  }

  return null;}