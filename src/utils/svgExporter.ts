import { IconConfig } from '../types/icon';

export function generateSvgString(config: IconConfig, size: number = 512): string {
  const pad = 2;
  const w = size - pad * 2;
  const h = size - pad * 2;
  const cx = size / 2;
  const cy = size / 2;
  const r = w / 2;

  let shapeElement = '';

  if (config.bgType !== 'transparent') {
    const bgFill = config.bgType === 'solid' ? config.bgColor : config.bgColor;
    const strokeAttr = config.borderWidth > 0 
      ? `stroke="${config.borderColor}" stroke-width="${config.borderWidth}" ${config.borderStyle === 'dashed' ? 'stroke-dasharray="8 6"' : ''}` 
      : '';

    switch (config.shape) {
      case 'square':
        shapeElement = `<rect x="${pad}" y="${pad}" width="${w}" height="${h}" fill="${bgFill}" ${strokeAttr} />`;
        break;
      case 'rounded-rect': {
        const radius = (config.borderRadius / 100) * (w / 2);
        shapeElement = `<rect x="${pad}" y="${pad}" width="${w}" height="${h}" rx="${radius}" fill="${bgFill}" ${strokeAttr} />`;
        break;
      }
      case 'circle':
        shapeElement = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${bgFill}" ${strokeAttr} />`;
        break;
      case 'squircle': {
        const radius = w * 0.45;
        shapeElement = `<rect x="${pad}" y="${pad}" width="${w}" height="${h}" rx="${radius}" fill="${bgFill}" ${strokeAttr} />`;
        break;
      }
      case 'diamond': {
        const dOffset = w * 0.04;
        shapeElement = `<polygon points="${cx},${pad + dOffset} ${pad + w - dOffset},${cy} ${cx},${pad + h - dOffset} ${pad + dOffset},${cy}" fill="${bgFill}" ${strokeAttr} />`;
        break;
      }
      default:
        shapeElement = `<rect x="${pad}" y="${pad}" width="${w}" height="${h}" rx="16" fill="${bgFill}" ${strokeAttr} />`;
    }
  }

  let contentElement = '';
  if (config.contentMode === 'text') {
    const fontSize = (config.fontSize / 100) * size * 0.75;
    const tx = cx + (config.textOffsetX / 100) * (size / 2);
    const ty = cy + (config.textOffsetY / 100) * (size / 2);
    contentElement = `<text x="${tx}" y="${ty}" font-family="${config.fontFamily}, sans-serif" font-weight="${config.fontWeight}" font-size="${fontSize}" fill="${config.textColor}" text-anchor="middle" dominant-baseline="central">${config.text}</text>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  ${shapeElement}
  ${contentElement}
</svg>`;
}
