"use client";
const loadedFonts = new Set<string>();
function normalizeFontName(apiName: string): string {
  return apiName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
export function loadFontDynamically(fontName: string): Promise<boolean> {
  const normalizedName = normalizeFontName(fontName);
  
  if (loadedFonts.has(normalizedName)) {
    return Promise.resolve(true);
  }
  return new Promise((resolve) => {
    const possiblePaths = [
      `/fonts/${normalizedName}.otf`,
      `/fonts/${normalizedName}.ttf`,
      `/fonts/${normalizedName}.woff2`,
      `/fonts/${normalizedName}.woff`,
      `/fonts/${fontName}.otf`,
      `/fonts/${fontName}.ttf`,
      `/fonts/${fontName}.woff2`,
      `/fonts/${fontName}.otf`,
      `/public/`,
    ];

    function tryLoadFont(pathIndex: number) {
      if (pathIndex >= possiblePaths.length) {
        console.warn(`Font ${fontName} not found in any location`);
        resolve(false);
        return;
      }

      const fontPath = possiblePaths[pathIndex];
      
      // Create @font-face rule
      const fontFaceRule = `
        @font-face {
          font-family: "${fontName}";
          src: url('${fontPath}') format('${getFontFormat(fontPath)}');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `;

      // Check if style already exists
      const existingStyle = document.getElementById(`font-${normalizedName}`);
      if (!existingStyle) {
        const style = document.createElement('style');
        style.id = `font-${normalizedName}`;
        style.textContent = fontFaceRule;
        document.head.appendChild(style);
      }

      // Test if font loads successfully
      const testFont = new FontFace(fontName, `url('${fontPath}')`);
      
      testFont.load()
        .then(() => {
          document.fonts.add(testFont);
          loadedFonts.add(normalizedName);
          console.log(`Font ${fontName} loaded successfully from ${fontPath}`);
          resolve(true);
        })
        .catch(() => {
          // Try next path
          tryLoadFont(pathIndex + 1);
        });
    }

    tryLoadFont(0);
  });
}

// Helper function to get font format from file extension
function getFontFormat(filePath: string): string {
  if (filePath.endsWith('.woff2')) return 'woff2';
  if (filePath.endsWith('.woff')) return 'woff';
  if (filePath.endsWith('.ttf')) return 'truetype';
  if (filePath.endsWith('.otf')) return 'opentype';
  return 'truetype';
}

// Function to apply font to document
export function applyFontToDocument(fontName: string): void {
  document.documentElement.style.setProperty(
    "--font-family",
    `"${fontName}", sans-serif`
  );
}

export async function getFontByApiName(apiName: string): Promise<boolean> {
  const success = await loadFontDynamically(apiName);
  
  if (success) {
    applyFontToDocument(apiName);
    return true;
  } else {
    document.documentElement.style.setProperty(
      "--font-family",
      "sans-serif"
    );
    return false;
  }
}