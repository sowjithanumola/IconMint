import JSZip from 'jszip';
import { IconConfig } from '../types/icon';
import { generatePngBlob } from './canvasRenderer';
import { generateIcoBlob } from './icoGenerator';

export async function createFaviconZipBundle(config: IconConfig, appName: string = 'My Web App'): Promise<Blob> {
  const zip = new JSZip();

  // 1. Generate ICO file
  const icoBlob = await generateIcoBlob(config, [16, 32, 48]);
  zip.file('favicon.ico', icoBlob);

  // 2. Generate standard PNG sizes
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 }
  ];

  for (const item of sizes) {
    const pngBlob = await generatePngBlob(config, item.size);
    zip.file(item.name, pngBlob);
  }

  // 3. Web App Manifest
  const manifestContent = JSON.stringify(
    {
      name: appName,
      short_name: appName,
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      theme_color: config.bgColor || '#09090b',
      background_color: config.bgColor || '#09090b',
      display: 'standalone'
    },
    null,
    2
  );
  zip.file('site.webmanifest', manifestContent);

  // 4. Ready-to-copy HTML Installation guide
  const htmlGuide = `<!-- IconMint Generated Favicon Tags -->
<!-- Place these tags inside the <head> section of your HTML document -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="${config.bgColor || '#09090b'}">
`;
  zip.file('favicon-html-code.html', htmlGuide);

  // 5. Readme instructions
  const readme = `IconMint Favicon Pack
====================
Generated with IconMint (Browser-based Favicon Studio).

Installation Instructions:
1. Copy all image files and site.webmanifest to the root directory of your website (e.g. /public or /).
2. Insert the code from favicon-html-code.html into the <head> element of your HTML pages.
3. Refresh your browser cache (Ctrl+F5 or Cmd+Shift+R) to see your new favicon immediately.

Included Files:
- favicon.ico (Multi-resolution: 16x16, 32x32, 48x48)
- favicon-16x16.png (Standard browser tabs)
- favicon-32x32.png (Retina displays and taskbars)
- favicon-48x48.png (Desktop shortcuts)
- apple-touch-icon.png (iOS home screen bookmarks)
- android-chrome-192x192.png (Android home screen)
- android-chrome-512x512.png (PWA splash and high-res store)
- site.webmanifest (PWA configuration)
- favicon-html-code.html (Ready-to-use HTML code snippet)
`;
  zip.file('README.txt', readme);

  return zip.generateAsync({ type: 'blob' });
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
