import { useEffect, useState } from 'react'
import './App.css'

function App() {
  interface Palette{
    primary: string
    secondary: string
    tertiary: string
    fourth: string
  }
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [message, setMessage] = useState<string>('');

  // Funciones para generar colores

  const getRandomColor = (): string => {
    const color = '#' + Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return color;
  };

  const getRandomPastelColor = (): string => {
    const min = 100, max = 230;
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  };

  const getRandomMetallicColor = (): string => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  };

  const getRandomVintageColor = (): string => {
    const min = 100, max = 200;
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  };

  const getRandomRetroColor = (): string => {
    const min = 150, max = 255;
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  };

  const getRandomNeonColor = (): string => {
    const min = 150, max = 255;
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  };

  const getRandomCoolColor = (): string => {
    const min = 0, max = 180;
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  };

  const getRandomDarkColor = (): string => {
    const min = 0, max = 100;
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  };

  // Función para generar una paleta usando una función generadora de colores
  const generatePalette = (generator: () => string): Palette => {
    return {
      primary: generator(),
      secondary: generator(),
      tertiary: generator(),
      fourth: generator()
    };
  };


  // Genera N paletas y actualiza el estado
  const createPalettes = (generator: () => string, count: number = 20) => {
    const newPalettes = Array.from({ length: count }, () => generatePalette(generator));
    setPalettes(newPalettes);
  };

  // Copiar texto al portapapeles
  const copyTextToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setMessage('Copied!');
        setTimeout(() => setMessage(''), 1500);
      })
      .catch(err => console.error('Failed to copy text:', err));
  };

  // Guardar paleta en localStorage
  const savePalette = (palette: Palette) => {
    const saved = localStorage.getItem('savedPalettes');
    const savedPalettes: Palette[] = saved ? JSON.parse(saved) : [];
    savedPalettes.push(palette);
    localStorage.setItem('savedPalettes', JSON.stringify(savedPalettes));
    setMessage('Saved!');
    setTimeout(() => setMessage(''), 1500);
  };

  // Cargar paletas guardadas
  const loadSavedPalettes = () => {
    const saved = localStorage.getItem('savedPalettes');
    if (saved) {
      setPalettes(JSON.parse(saved));
    }
  };

  useEffect(() => {
    createPalettes(getRandomColor);
  }, []);

 

  return (  
    <div className="min-h-screen bg-white">
      {/* Menú fijo */}
      <header className="fixed top-0 left-0 w-full bg-white shadow z-10">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center p-4">
          <h1 className="text-2xl font-bold">Palette Color</h1>
          <nav className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            <button onClick={() => createPalettes(getRandomColor)} className="px-4 py-2 text-black hover:text-yellow-500">
              Random
            </button>
            <button onClick={() => createPalettes(getRandomPastelColor)} className="px-4 py-2 text-black hover:text-yellow-500">
              Pastel
            </button>
            <button onClick={() => createPalettes(getRandomMetallicColor)} className="px-4 py-2 text-black hover:text-yellow-500">
              Metalic
            </button>
            <button onClick={() => createPalettes(getRandomVintageColor)} className="px-4 py-2 text-black hover:text-yellow-500">
              Vintage
            </button>
            <button onClick={() => createPalettes(getRandomRetroColor)} className="px-4 py-2 text-black hover:text-yellow-500">
              Retro
            </button>
            <button onClick={() => createPalettes(getRandomNeonColor)} className="px-4 py-2 text-black hover:text-yellow-500">
              Neon
            </button>
            <button onClick={() => createPalettes(getRandomCoolColor)} className="px-4 py-2 text-black hover:text-yellow-500">
              Cold
            </button>
            <button onClick={() => createPalettes(getRandomDarkColor)} className="px-4 py-2 text-black hover:text-yellow-500">
              Dark
            </button>
            <button onClick={loadSavedPalettes} className="px-4 py-2 text-black hover:text-yellow-500">
              Saved
            </button>
          </nav>
        </div>
      </header>

      {/* Mensaje temporal */}
      {message && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded z-999">
          {message}
        </div>
      )}

      {/* Contenedor de paletas */}
      <main className="pt-24 container mx-auto px-4 bg-white">
        {palettes.length === 0 ? (
          <p className="text-center text-gray-600">Haz click en algún botón para generar paletas</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {palettes.map((palette, index) => (
              <div key={index} className="bg-white shadow rounded p-2">
                {/* Cada paleta se muestra como una grilla de 2x2 */}
                <div className="grid grid-cols-2 grid-rows-2 gap-3">
                  {(['primary', 'secondary', 'tertiary', 'fourth'] as const).map((key) => (
                    <div
                      key={key}
                      className="group relative h-16 rounded-sm"
                      style={{ backgroundColor: palette[key] }}
                    >
                      <span className="absolute bottom-0 left-0 bg-gray-700 bg-opacity-75 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition duration-300"
                      onClick={() => copyTextToClipboard(palette[key])}
                      >
                        {palette[key].toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() =>
                      copyTextToClipboard(
                        [palette.primary, palette.secondary, palette.tertiary, palette.fourth].join(',')
                      )
                    }
                    className="w-full h-8 bg-white text-black border border-black rounded text-sm cursor-pointer hover:bg-black hover:text-white"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => savePalette(palette)}
                    className="w-full h-8 bg-white text-black border border-black rounded text-sm cursor-pointer hover:text-white hover:bg-zinc-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-8 bg-white p-4 text-center shadow">
        ©
        <a href="https://vinicioesparza-dev.me" className="hover:text-yellow-500 ml-1">
          Vinicio Esparza
        </a>
        <nav className="mt-2 flex justify-center space-x-4">
          <a href="https://vinicioesparza-dev.me/#experiencia" className="hover:text-yellow-500">
            Experiencia
          </a>
          <a href="https://vinicioesparza-dev.me/#proyectos" className="hover:text-yellow-500">
            Proyectos
          </a>
          <a href="https://vinicioesparza-dev.me/#sobre-mi" className="hover:text-yellow-500">
            Sobre mí
          </a>
          <a href="mailto:vinicioesparza15@gmail.com" className="hover:text-yellow-500">
            Contacto
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default App
