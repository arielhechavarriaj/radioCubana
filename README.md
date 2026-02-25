# 📻 RadioCubana - Escucha la radio cubana

Aplicación de escritorio construida con **Wails**, **React**, **TypeScript**, **TailwindCSS** y **Zustand** para disfrutar de todas las emisoras de radio de Cuba, tanto nacionales como provinciales y municipales. Incluye un **scraper automático** que actualiza la lista de emisoras desde Wikipedia, el portal oficial de Radio Cubana y EcuRed.

<img width="1913" height="1145" alt="image" src="https://github.com/user-attachments/assets/2bd09eb4-89d4-480c-a64e-63c1cdba3f72" />


## ✨ Características

- 🎵 **Reproducción en vivo** de más de 100 emisoras cubanas.
- 🔍 **Búsqueda y filtros** por nombre, categoría (Internacional, Nacional, Provincial, Municipal) y provincia.
- 🌓 **Modo oscuro/claro** con persistencia de preferencia.
- 🖼️ **Dos modos de visualización**: lista y cuadrícula con imágenes representativas (obtenidas de EcuRed o generadas automáticamente).
- ⭐ **Favoritos** sincronizados entre sesiones (guardados localmente).
- 🔊 **Control de volumen** y reproducción en segundo plano.
- 📄 **Información detallada** de cada emisora: descripción, provincia, municipio (extraídos de Wikipedia y EcuRed).
- 🚀 **Rápido y liviano** gracias a Go y React.

## 🛠️ Tecnologías

- **Backend:** [Go](https://golang.org/) + [Wails](https://wails.io/)
- **Frontend:** [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Estilos:** [TailwindCSS](https://tailwindcss.com/) + [Heroicons](https://heroicons.com/)
- **Estado global:** [Zustand](https://zustand-demo.pmnd.rs/) (con persistencia en localStorage)
- **Reproducción de audio:** API de audio HTML5
- **Scraping:** [Axios](https://axios-http.com/) + [Cheerio](https://cheerio.js.org/)


## 📦 Instalación

### Requisitos previos
- [Go](https://golang.org/dl/) (>= 1.21)
- [Node.js](https://nodejs.org/) (>= 18)
- [Wails](https://wails.io/docs/gettingstarted/installation)

### Pasos

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tuusuario/radiocubana.git
   cd radiocubana
   Instala las dependencias del frontend:

2. **Instala las dependencias del frontend:**
 ```bash
cd frontend
npm install
cd .. 
 ```

3. **Ejecuta en modo desarrollo:**

 ```bash
wails dev
 ```

4. **Compila para producción:**
 ```bash
wails build
El ejecutable estará en build/bin/.
 ```
### 🕷️ Scraper de emisoras
La aplicación incluye un scraper automático que actualiza la lista de emisoras. Para ejecutarlo manualmente:

 ```bash
cd scraper
npm install
npm run scrape
 ```
Esto generará el archivo frontend/src/data/radios.ts con los datos más recientes (títulos, categorías, provincias, descripciones e imágenes). El scraper obtiene información de:

* Wikipedia (tabla de emisoras)
* Portal oficial de Radio Cubana (listado completo con paginación)
* EcuRed (descripciones e imágenes de cada emisora)

## 👨‍💻 Autor

**Ariel Hechavarria Jardines**
- Email: [leiraStudio@gmail.com](mailto:leiraStudio@gmail.com)

Si te gusta este proyecto, ¡no dudes en contactarme o contribuir!
