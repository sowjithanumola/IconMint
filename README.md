# IconMint - Browser-Based Favicon Creator & Icon Studio

IconMint is a fast, free, browser-based favicon creator and icon design studio built with React 19, TypeScript, Vite, and Tailwind CSS. It requires zero server backends or paid external APIs, processing all graphics and bundle archives directly in the user browser using HTML5 Canvas and Web APIs.

## Features

- **Full Canvas Geometry Engine**: Design icons using 9 geometric shapes (Squircle, Rounded Rectangle with custom radius, Circle, Square, Hexagon, Shield, Diamond, Octagon, Starburst Seal).
- **Background Modes**: Solid colors, Linear gradients with customizable angles, Radial gradients, Subtle geometric patterns (Grid, Dots, Stripes, Checkerboard), and 100% Transparent backgrounds.
- **Content Layers**:
  - **80+ Curated Vector Icons**: Searchable categorized library (Dev & Tech, Creative & Brand, Commerce & Finance, Shapes & Symbols, General Utility) powered by Lucide with custom stroke width, scale, color, position offset, and rotation.
  - **Monogram & Typography**: 1 to 3 letter monograms with font styling (Plus Jakarta Sans, JetBrains Mono, Georgia, Impact), weights, font scaling, and fine-tuned optical positioning.
  - **Custom Image Upload**: Drag-and-drop or select your own SVG or PNG files for instant favicon framing and multi-resolution packaging.
- **Live Real-World Previews**:
  - Realistic desktop browser tab mockups with dark and light themes.
  - Mobile iOS home screen dock mockup.
  - Google Search snippet preview showing real-world favicon appearance.
  - Multiple size matrix cards (16×16, 32×32, 48×48, 64×64, 128×128, 256×256).
- **Active Browser Tab Favicon Sync**: One-click button dynamically updates the real browser tab `<link rel="icon">` in the document head so you can see your icon live in action.
- **Production Export Suite**:
  - Download individual PNGs at 16, 32, 48, 128, 180, and 256 px.
  - Download valid multi-resolution Windows `.ico` files containing 16x16, 32x32, and 48x48 PNG frames.
  - Download scalable `.svg` markup or copy to clipboard.
  - Complete `.zip` package generation (includes `favicon.ico`, PNGs, `site.webmanifest`, and copy-paste HTML tags).
  - One-click copy HTML `<head>` installation snippet.
- **State & Workflow Controls**:
  - LocalStorage autosave (persists state across browser refreshes).
  - Undo and Redo history stack with keyboard shortcuts (`Ctrl+Z`, `Ctrl+Y`).
  - Aesthetic Smart Randomizer (`Surprise Me`).
  - Reset to default configuration.
  - Curated preset library with 20+ ready-to-use favicon styles.
- **Launch & Compliance Checklist**:
  - Custom domain connection guide and DNS verification helper.
  - Custom favicon included in `index.html`.
  - Zero "Made with AI" tags or watermarks.
  - Comprehensive Privacy Policy page and modal.
  - Full Terms and Conditions page and modal (100% royalty-free commercial usage).

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Packaging**: JSZip (client-side ZIP generation)
- **Deployment**: Free, zero API keys, deployable to Vercel, Netlify, or Cloudflare Pages with zero configuration

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Compile and verify production build
npm run build
```

## Deployment to Vercel

IconMint is structured as a static single-page application and deploys seamlessly to Vercel:

```bash
npx vercel
```

Build command: `npm run build`  
Output directory: `dist`
