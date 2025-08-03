import { useEffect, useState } from 'react'
import './App.css'

function App() {
  interface Palette{
    primary: string
    secondary: string
    tertiary: string
    fourth: string
    hash: string
  }
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [message, setMessage] = useState<string>('');
  const [baseColor, setBaseColor] = useState<string>('#3b82f6');
  const [secondBaseColor, setSecondBaseColor] = useState<string>('#f59e42');
  // Interpolación HSL entre dos colores
  function interpolateHSL(hex1: string, hex2: string, t: number): string {
    const [h1, s1, l1] = hexToHsl(hex1);
    const [h2, s2, l2] = hexToHsl(hex2);
    // Interpolación circular para el matiz
    let dh = h2 - h1;
    if (dh > 180) dh -= 360;
    if (dh < -180) dh += 360;
    const h = (h1 + dh * t + 360) % 360;
    const s = s1 + (s2 - s1) * t;
    const l = l1 + (l2 - l1) * t;
    return hslToHex(h, s, l);
  }

  // Generar paleta interpolando entre dos colores base
  function generateBetweenColorsPalette(hex1: string, hex2: string): Palette {
    // Usar valores t aleatorios para cada color
    const tValues = Array.from({ length: 4 }, () => Math.random());
    // Añadir variación aleatoria más fuerte a cada color
    const colors = tValues.map(t => {
      const color = interpolateHSL(hex1, hex2, t);
      let [h, s, l] = hexToHsl(color);
      h = (h + (Math.random() * 60 - 30) + 360) % 360; // más variación
      s = Math.max(10, Math.min(100, s + (Math.random() * 40 - 20)));
      l = Math.max(10, Math.min(90, l + (Math.random() * 40 - 20)));
      return hslToHex(h, s, l);
    });
    // Barajar el orden de los colores
    for (let i = colors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colors[i], colors[j]] = [colors[j], colors[i]];
    }
    return {
      primary: colors[0],
      secondary: colors[1],
      tertiary: colors[2],
      fourth: colors[3],
      hash: generatePaletteHash(colors[0], colors[1], colors[2], colors[3])
    };
  }
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isViewingSaved, setIsViewingSaved] = useState<boolean>(false);

  // Funciones para generar colores

  // Función para generar hash de una paleta
  const generatePaletteHash = (primary: string, secondary: string, tertiary: string, fourth: string): string => {
    const combined = `${primary}${secondary}${tertiary}${fourth}`.toLowerCase();
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  };

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

  // Funciones para generar paletas basadas en un color
  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  const hslToHex = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c: number) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const generateComplementaryPalette = (baseColor: string): Palette => {
    const [h, s, l] = hexToHsl(baseColor);
    // Agregar variaciones aleatorias
    const variation1 = Math.random() * 30 - 15; // -15 a +15
    const variation2 = Math.random() * 20 - 10; // -10 a +10
    const satVariation = Math.random() * 30 - 15; // -15 a +15
    const lightVariation = Math.random() * 20 - 10; // -10 a +10
    
    const primary = baseColor;
    const secondary = hslToHex((h + 180 + variation1) % 360, Math.max(20, Math.min(100, s + satVariation)), Math.max(20, Math.min(80, l + lightVariation)));
    const tertiary = hslToHex((h + 120 + variation2) % 360, Math.max(20, s - 20), Math.max(20, l - 20));
    const fourth = hslToHex((h + 240 + variation1) % 360, Math.max(20, s + 10), Math.min(80, l + 20));
    
    return {
      primary,
      secondary,
      tertiary,
      fourth,
      hash: generatePaletteHash(primary, secondary, tertiary, fourth)
    };
  };

  const generateAnalogousPalette = (baseColor: string): Palette => {
    const [h, s, l] = hexToHsl(baseColor);
    // Agregar variaciones aleatorias
    const variation1 = Math.random() * 20 - 10; // -10 a +10
    const variation2 = Math.random() * 20 - 10; // -10 a +10
    const satVariation = Math.random() * 25 - 12.5; // -12.5 a +12.5
    
    const primary = baseColor;
    const secondary = hslToHex((h + 30 + variation1) % 360, Math.max(20, Math.min(100, s + satVariation)), l);
    const tertiary = hslToHex((h - 30 + variation2 + 360) % 360, Math.max(20, s), Math.max(20, Math.min(80, l + variation1)));
    const fourth = hslToHex((h + 60 + variation1) % 360, Math.max(20, s - 20), Math.max(20, Math.min(80, l + variation2)));
    
    return {
      primary,
      secondary,
      tertiary,
      fourth,
      hash: generatePaletteHash(primary, secondary, tertiary, fourth)
    };
  };

  const generateMonochromaticPalette = (baseColor: string): Palette => {
    const [h, s, l] = hexToHsl(baseColor);
    // Agregar variaciones aleatorias en luminosidad y saturación
    const lightVar1 = Math.random() * 40 - 20; // -20 a +20
    const lightVar2 = Math.random() * 40 - 20; // -20 a +20
    const satVar = Math.random() * 30 - 15; // -15 a +15
    
    const primary = baseColor;
    const secondary = hslToHex(h, Math.max(20, Math.min(100, s + satVar)), Math.max(10, Math.min(90, l + lightVar1)));
    const tertiary = hslToHex(h, Math.max(20, s), Math.max(10, Math.min(90, l + lightVar2)));
    const fourth = hslToHex(h, Math.max(20, s - 30), Math.max(20, Math.min(80, l + (lightVar1 + lightVar2) / 2)));
    
    return {
      primary,
      secondary,
      tertiary,
      fourth,
      hash: generatePaletteHash(primary, secondary, tertiary, fourth)
    };
  };

  const generateTriadicPalette = (baseColor: string): Palette => {
    const [h, s, l] = hexToHsl(baseColor);
    // Agregar variaciones aleatorias
    const variation1 = Math.random() * 20 - 10; // -10 a +10
    const variation2 = Math.random() * 20 - 10; // -10 a +10
    const satVariation = Math.random() * 25 - 12.5; // -12.5 a +12.5
    const lightVariation = Math.random() * 20 - 10; // -10 a +10
    
    const primary = baseColor;
    const secondary = hslToHex((h + 120 + variation1) % 360, Math.max(20, Math.min(100, s + satVariation)), Math.max(20, Math.min(80, l + lightVariation)));
    const tertiary = hslToHex((h + 240 + variation2) % 360, Math.max(20, s), Math.max(20, l));
    const fourth = hslToHex((h + variation1) % 360, Math.max(20, s - 20), Math.max(20, l - 20));
    
    return {
      primary,
      secondary,
      tertiary,
      fourth,
      hash: generatePaletteHash(primary, secondary, tertiary, fourth)
    };
  };

  // Función para generar una paleta usando una función generadora de colores
  const generatePalette = (generator: () => string): Palette => {
    const primary = generator();
    const secondary = generator();
    const tertiary = generator();
    const fourth = generator();
    
    return {
      primary,
      secondary,
      tertiary,
      fourth,
      hash: generatePaletteHash(primary, secondary, tertiary, fourth)
    };
  };


  // Genera N paletas y actualiza el estado
  const createPalettes = (generator: () => string, count: number = 20) => {
    const newPalettes: Palette[] = [];
    const usedHashes = new Set<string>();
    
    // Incluir hashes de paletas actuales para evitar duplicados
    palettes.forEach(palette => usedHashes.add(palette.hash));
    
    let attempts = 0;
    const maxAttempts = count * 3; // Máximo 3 intentos por paleta para evitar bucle infinito
    
    while (newPalettes.length < count && attempts < maxAttempts) {
      const newPalette = generatePalette(generator);
      
      if (!usedHashes.has(newPalette.hash)) {
        newPalettes.push(newPalette);
        usedHashes.add(newPalette.hash);
      }
      
      attempts++;
    }
    
    setPalettes(newPalettes);
    setIsViewingSaved(false);
  };

  // Utilidad para barajar los colores de una paleta
  function shufflePalette(palette: Palette): Palette {
    const colors = [palette.primary, palette.secondary, palette.tertiary, palette.fourth];
    for (let i = colors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colors[i], colors[j]] = [colors[j], colors[i]];
    }
    return {
      primary: colors[0],
      secondary: colors[1],
      tertiary: colors[2],
      fourth: colors[3],
      hash: generatePaletteHash(colors[0], colors[1], colors[2], colors[3])
    };
  }

  // Generar paletas basadas en un color específico (mejorada)
  const createBasedOnColorPalettes = (color: string, count: number = 20) => {
    const newPalettes: Palette[] = [];
    const usedHashes = new Set<string>();
    palettes.forEach(palette => usedHashes.add(palette.hash));

    let attempts = 0;
    const maxAttempts = count * 8;

    while (newPalettes.length < count && attempts < maxAttempts) {
      // 50% probabilidad de usar interpolación entre dos colores base
      let newPalette: Palette;
      if (secondBaseColor && Math.random() < 0.5) {
        newPalette = generateBetweenColorsPalette(color, secondBaseColor);
      } else {
        // Elegir tipo de armonía aleatoriamente
        const typeIndex = Math.floor(Math.random() * 4);
        switch (typeIndex) {
          case 0:
            newPalette = generateComplementaryPalette(color);
            break;
          case 1:
            newPalette = generateAnalogousPalette(color);
            break;
          case 2:
            newPalette = generateMonochromaticPalette(color);
            break;
          case 3:
            newPalette = generateTriadicPalette(color);
            break;
          default:
            newPalette = generateComplementaryPalette(color);
        }
        newPalette = shufflePalette(newPalette);
      }
      if (!usedHashes.has(newPalette.hash)) {
        newPalettes.push(newPalette);
        usedHashes.add(newPalette.hash);
      }
      attempts++;
    }
    setPalettes(newPalettes);
    setIsViewingSaved(false);
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
    
    // Verificar si la paleta ya existe usando el hash
    const paletteExists = savedPalettes.some(savedPalette => savedPalette.hash === palette.hash);
    
    if (paletteExists) {
      setMessage('Already saved!');
      setTimeout(() => setMessage(''), 1500);
      return;
    }
    
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
      setIsViewingSaved(true);
    }
  };

  // Eliminar paleta guardada
  const deleteSavedPalette = (paletteHash: string) => {
    const saved = localStorage.getItem('savedPalettes');
    if (saved) {
      const savedPalettes: Palette[] = JSON.parse(saved);
      const filteredPalettes = savedPalettes.filter(palette => palette.hash !== paletteHash);
      localStorage.setItem('savedPalettes', JSON.stringify(filteredPalettes));
      
      // Si estamos viendo paletas guardadas, actualizar la vista
      if (isViewingSaved) {
        setPalettes(filteredPalettes);
      }
      
      setMessage('Deleted!');
      setTimeout(() => setMessage(''), 1500);
    }
  };

  useEffect(() => {
    const generateInitialPalettes = () => {
      const newPalettes = Array.from({ length: 20 }, () => generatePalette(getRandomColor));
      setPalettes(newPalettes);
      setIsViewingSaved(false);
    };
    generateInitialPalettes();
  }, []);

 

  return (  
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Menú fijo - Versión Desktop */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-lg z-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Palette Color
            </h1>
            
            {/* Menu hamburguesa para móvil */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
              </div>
            </button>

            {/* Navegación Desktop */}
            <nav className="hidden md:flex items-center gap-2">
              <div className="flex gap-2 mr-4">
                <button onClick={() => createPalettes(getRandomColor)} className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium">
                  Random
                </button>
                <button onClick={() => createPalettes(getRandomPastelColor)} className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium">
                  Pastel
                </button>
                <button onClick={() => createPalettes(getRandomMetallicColor)} className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium">
                  Metallic
                </button>
                <button onClick={() => createPalettes(getRandomVintageColor)} className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium">
                  Vintage
                </button>
                <button onClick={() => createPalettes(getRandomRetroColor)} className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium">
                  Retro
                </button>
                <button onClick={() => createPalettes(getRandomNeonColor)} className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium">
                  Neon
                </button>
                <button onClick={() => createPalettes(getRandomCoolColor)} className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium">
                  Cool
                </button>
                <button onClick={() => createPalettes(getRandomDarkColor)} className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium">
                  Dark
                </button>
                <button onClick={loadSavedPalettes} className="px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium">
                  Saved
                </button>
              </div>
              
              {/* Color Picker Section */}
              <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
                <button 
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-md"
                >
                  From Color
                </button>
                {showColorPicker && (
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={baseColor}
                      onChange={(e) => setBaseColor(e.target.value)}
                      placeholder="#000000"
                      className="w-24 px-2 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <span className="mx-2 text-gray-500">→</span>
                    <input
                      type="color"
                      value={secondBaseColor}
                      onChange={(e) => setSecondBaseColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={secondBaseColor}
                      onChange={(e) => setSecondBaseColor(e.target.value)}
                      placeholder="#f59e42"
                      className="w-24 px-2 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <button
                      onClick={() => createBasedOnColorPalettes(baseColor)}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      Generate
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Navegación Mobile */}
          <nav className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button onClick={() => { createPalettes(getRandomColor); setIsMobileMenuOpen(false); }} className="px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium text-sm">
                Random
              </button>
              <button onClick={() => { createPalettes(getRandomPastelColor); setIsMobileMenuOpen(false); }} className="px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium text-sm">
                Pastel
              </button>
              <button onClick={() => { createPalettes(getRandomMetallicColor); setIsMobileMenuOpen(false); }} className="px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium text-sm">
                Metallic
              </button>
              <button onClick={() => { createPalettes(getRandomVintageColor); setIsMobileMenuOpen(false); }} className="px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium text-sm">
                Vintage
              </button>
              <button onClick={() => { createPalettes(getRandomRetroColor); setIsMobileMenuOpen(false); }} className="px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium text-sm">
                Retro
              </button>
              <button onClick={() => { createPalettes(getRandomNeonColor); setIsMobileMenuOpen(false); }} className="px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium text-sm">
                Neon
              </button>
              <button onClick={() => { createPalettes(getRandomCoolColor); setIsMobileMenuOpen(false); }} className="px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium text-sm">
                Cool
              </button>
              <button onClick={() => { createPalettes(getRandomDarkColor); setIsMobileMenuOpen(false); }} className="px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium text-sm">
                Dark
              </button>
              <button onClick={() => { loadSavedPalettes(); setIsMobileMenuOpen(false); }} className="px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium text-sm col-span-2">
                Saved Palettes
              </button>
            </div>
            
            {/* Color Picker Mobile */}
            <div className="border-t pt-4 border-gray-200">
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold text-gray-700">Generate from Color:</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    placeholder="#000000"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => { createBasedOnColorPalettes(baseColor); setIsMobileMenuOpen(false); }}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium text-sm"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Mensaje temporal */}
      {message && (
        <div className={`fixed top-20 right-4 px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse ${
          message === 'Already saved!' 
            ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
            : message === 'Deleted!'
            ? 'bg-gradient-to-r from-red-500 to-red-600'
            : 'bg-gradient-to-r from-green-500 to-emerald-500'
        } text-white`}>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              {message === 'Already saved!' ? (
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              ) : message === 'Deleted!' ? (
                <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              )}
            </svg>
            {message}
          </div>
        </div>
      )}

      {/* Contenedor de paletas */}
      <main className="flex-1 pt-40 md:pt-32 container mx-auto px-4 pb-20">
        {palettes.length === 0 ? (
          <div className="text-center py-20 min-h-[60vh] flex flex-col justify-center items-center">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isViewingSaved ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                )}
              </svg>
            </div>
            {isViewingSaved ? (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No Saved Palettes</h2>
                <p className="text-gray-600 mb-8">You haven't saved any color palettes yet. Generate some beautiful palettes and save your favorites!</p>
                <button 
                  onClick={() => createPalettes(getRandomColor)}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg transform hover:scale-105"
                >
                  Generate Some Palettes
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Perfect Palette</h2>
                <p className="text-gray-600 mb-8">Choose a style above or select a base color to generate beautiful color palettes</p>
                <button 
                  onClick={() => createPalettes(getRandomColor)}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg transform hover:scale-105"
                >
                  Generate Random Palettes
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {palettes.map((palette, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                {/* Cada paleta se muestra como una grilla de 2x2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', height: '160px' }}>
                  {(['primary', 'secondary', 'tertiary', 'fourth'] as const).map((key) => (
                    <div
                      key={key}
                      className="group relative cursor-pointer"
                      style={{ 
                        backgroundColor: palette[key],
                        background: palette[key],
                        border: 'none',
                        outline: 'none',
                        position: 'relative'
                      }}
                      onClick={() => copyTextToClipboard(palette[key])}
                    >
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          backgroundColor: 'rgba(0,0,0,0)',
                          transition: 'background-color 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)';
                        }}
                      >
                        <span 
                          className="text-white text-xs font-bold bg-black bg-opacity-75 px-2 py-1 rounded shadow-lg"
                          style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '1';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '0';
                          }}
                        >
                          {palette[key].toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        copyTextToClipboard(
                          [palette.primary, palette.secondary, palette.tertiary, palette.fourth].join(', ')
                        )
                      }
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </button>
                    {isViewingSaved ? (
                      <button
                        onClick={() => deleteSavedPalette(palette.hash)}
                        className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 font-medium text-sm flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    ) : (
                      <button
                        onClick={() => savePalette(palette)}
                        className="flex-1 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-200 font-medium text-sm flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Save
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Made with ❤️ by{' '}
              <a 
                href="https://vinicioesparza-dev.me" 
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200"
              >
                Vinicio Esparza
              </a>
            </p>
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              <a 
                href="https://vinicioesparza-dev.me/#experiencia" 
                className="text-gray-500 hover:text-purple-600 transition-colors duration-200"
              >
                Experience
              </a>
              <a 
                href="https://vinicioesparza-dev.me/#proyectos" 
                className="text-gray-500 hover:text-purple-600 transition-colors duration-200"
              >
                Projects
              </a>
              <a 
                href="https://vinicioesparza-dev.me/#sobre-mi" 
                className="text-gray-500 hover:text-purple-600 transition-colors duration-200"
              >
                About
              </a>
              <a 
                href="mailto:vinicioesparza15@gmail.com" 
                className="text-gray-500 hover:text-purple-600 transition-colors duration-200"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App
