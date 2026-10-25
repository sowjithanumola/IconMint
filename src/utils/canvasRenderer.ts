import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { IconConfig, ShapeType } from '../types/icon';
import { getIconById } from '../data/icons';

// Path generators for geometric shapes
export function createShapePath(ctx: CanvasRenderingContext2D, shape: ShapeType, size: number, borderRadiusPercent: number) {
  const pad = 2; // subtle inset to prevent anti-aliasing clipping
  const x = pad;
  const y = pad;
  const w = size - pad * 2;
  const h = size - pad * 2;
  const cx = size / 2;
  const cy = size / 2;
  const r = w / 2;

  ctx.beginPath();

  switch (shape) {
    case 'square':
      ctx.rect(x, y, w, h);
      break;

    case 'rounded-rect': {
      // Radius between 0 and half-width
      const radius = (borderRadiusPercent / 100) * (w / 2);
      ctx.roundRect(x, y, w, h, radius);
      break;
    }

    case 'circle':
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      break;

    case 'squircle': {
      // Smooth Apple-style superellipse (n ≈ 4.2)
      const n = 4.2;
      const step = Math.PI / 180;
      for (let angle = 0; angle <= Math.PI * 2; angle += step) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const px = cx + Math.sign(cos) * Math.pow(Math.abs(cos), 2 / n) * (r * 0.98);
        const py = cy + Math.sign(sin) * Math.pow(Math.abs(sin), 2 / n) * (r * 0.98);
        if (angle === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      break;
    }

    case 'hexagon': {
      const hexR = r * 0.96;
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60 - 30) * (Math.PI / 180);
        const hx = cx + hexR * Math.cos(angle);
        const hy = cy + hexR * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      break;
    }

    case 'shield': {
      // Heraldic shield shape
      const top = y + h * 0.08;
      const bottom = y + h * 0.96;
      const left = x + w * 0.08;
      const right = x + w * 0.92;
      
      ctx.moveTo(cx, top);
      ctx.lineTo(right, top + h * 0.08);
      ctx.bezierCurveTo(right, top + h * 0.5, cx + w * 0.25, bottom * 0.85, cx, bottom);
      ctx.bezierCurveTo(cx - w * 0.25, bottom * 0.85, left, top + h * 0.5, left, top + h * 0.08);
      ctx.closePath();
      break;
    }

    case 'diamond': {
      const dOffset = w * 0.04;
      ctx.moveTo(cx, y + dOffset);
      ctx.lineTo(x + w - dOffset, cy);
      ctx.lineTo(cx, y + h - dOffset);
      ctx.lineTo(x + dOffset, cy);
      ctx.closePath();
      break;
    }

    case 'octagon': {
      const cut = w * 0.28;
      ctx.moveTo(x + cut, y);
      ctx.lineTo(x + w - cut, y);
      ctx.lineTo(x + w, y + cut);
      ctx.lineTo(x + w, y + h - cut);
      ctx.lineTo(x + w - cut, y + h);
      ctx.lineTo(x + cut, y + h);
      ctx.lineTo(x, y + h - cut);
      ctx.lineTo(x, y + cut);
      ctx.closePath();
      break;
    }

    case 'badge': {
      // 12-point starburst / seal
      const points = 12;
      const outerR = r * 0.96;
      const innerR = r * 0.82;
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerR : innerR;
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const bx = cx + radius * Math.cos(angle);
        const by = cy + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(bx, by);
        else ctx.lineTo(bx, by);
      }
      ctx.closePath();
      break;
    }

    default:
      ctx.rect(x, y, w, h);
  }
}

// Background renderer with gradients, patterns, and fills
function renderBackground(ctx: CanvasRenderingContext2D, config: IconConfig, size: number) {
  if (config.bgType === 'transparent') {
    return;
  }

  const cx = size / 2;
  const cy = size / 2;

  if (config.bgType === 'solid') {
    ctx.fillStyle = config.bgColor;
    ctx.fill();
  } else if (config.bgType === 'gradient') {
    // Linear gradient at angle
    const angleRad = (config.bgGradientAngle * Math.PI) / 180;
    const length = size * Math.SQRT2;
    const x0 = cx - (Math.cos(angleRad) * length) / 2;
    const y0 = cy - (Math.sin(angleRad) * length) / 2;
    const x1 = cx + (Math.cos(angleRad) * length) / 2;
    const y1 = cy + (Math.sin(angleRad) * length) / 2;

    const grad = ctx.createLinearGradient(x0, y0, x1, y1);
    grad.addColorStop(0, config.bgColor);
    grad.addColorStop(1, config.bgGradientColorEnd || config.bgColor);
    ctx.fillStyle = grad;
    ctx.fill();
  } else if (config.bgType === 'radial') {
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.7);
    grad.addColorStop(0, config.bgColor);
    grad.addColorStop(1, config.bgGradientColorEnd || '#000000');
    ctx.fillStyle = grad;
    ctx.fill();
  } else if (config.bgType === 'pattern') {
    // Fill base color
    ctx.fillStyle = config.bgColor;
    ctx.fill();

    // Draw pattern overlay
    ctx.save();
    ctx.clip(); // clip to shape
    ctx.strokeStyle = `rgba(255, 255, 255, ${config.patternOpacity || 0.15})`;
    ctx.fillStyle = `rgba(255, 255, 255, ${config.patternOpacity || 0.15})`;
    ctx.lineWidth = 1;

    const spacing = 16;
    if (config.patternType === 'grid') {
      for (let px = 0; px <= size; px += spacing) {
        ctx.beginPath();
        ctx.moveTo(px, 0);
        ctx.lineTo(px, size);
        ctx.stroke();
      }
      for (let py = 0; py <= size; py += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(size, py);
        ctx.stroke();
      }
    } else if (config.patternType === 'dots') {
      for (let px = spacing / 2; px <= size; px += spacing) {
        for (let py = spacing / 2; py <= size; py += spacing) {
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (config.patternType === 'stripes') {
      for (let d = -size; d <= size * 2; d += spacing) {
        ctx.beginPath();
        ctx.moveTo(d, 0);
        ctx.lineTo(d + size, size);
        ctx.stroke();
      }
    } else if (config.patternType === 'checker') {
      const cSize = 20;
      for (let px = 0; px < size; px += cSize) {
        for (let py = 0; py < size; py += cSize) {
          if ((Math.floor(px / cSize) + Math.floor(py / cSize)) % 2 === 0) {
            ctx.fillRect(px, py, cSize, cSize);
          }
        }
      }
    }
    ctx.restore();
  }
}

// Border renderer
function renderBorder(ctx: CanvasRenderingContext2D, config: IconConfig, size: number) {
  if (config.borderWidth <= 0 || config.bgType === 'transparent') return;

  ctx.save();
  ctx.lineWidth = config.borderWidth;
  ctx.strokeStyle = config.borderColor;

  if (config.borderStyle === 'dashed') {
    ctx.setLineDash([8, 6]);
  } else {
    ctx.setLineDash([]);
  }

  // Stroke the current shape path
  createShapePath(ctx, config.shape, size, config.borderRadius);
  ctx.stroke();
  ctx.restore();
}

// SVG cache for Lucide icons to prevent re-parsing
const svgImageCache = new Map<string, HTMLImageElement>();

export async function getIconImage(iconName: string, color: string, strokeWidth: number, targetSize: number): Promise<HTMLImageElement> {
  const cacheKey = `${iconName}_${color}_${strokeWidth}_${targetSize}`;
  if (svgImageCache.has(cacheKey)) {
    return svgImageCache.get(cacheKey)!;
  }

  const IconComp = getIconById(iconName);
  const element = React.createElement(IconComp, {
    size: 24,
    color,
    strokeWidth
  });

  const rawSvg = renderToStaticMarkup(element);
  const svgBlob = new Blob([rawSvg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      URL.revokeObjectURL(url);
      svgImageCache.set(cacheKey, img);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.src = url;
  });
}

// Render content layer (Icon, Text, or Custom Image)
async function renderContent(ctx: CanvasRenderingContext2D, config: IconConfig, size: number) {
  const cx = size / 2;
  const cy = size / 2;

  ctx.save();

  // Shadow / Glow setup
  if (config.shadowBlur > 0 && config.shadowColor) {
    ctx.shadowBlur = config.shadowBlur;
    ctx.shadowColor = config.shadowColor;
    ctx.shadowOffsetX = config.shadowOffsetX || 0;
    ctx.shadowOffsetY = config.shadowOffsetY || 0;
  }

  if (config.contentMode === 'icon') {
    const iconSizePx = (config.iconSize / 100) * size;
    const targetX = cx + (config.iconOffsetX / 100) * (size / 2);
    const targetY = cy + (config.iconOffsetY / 100) * (size / 2);

    ctx.translate(targetX, targetY);
    if (config.iconRotation) {
      ctx.rotate((config.iconRotation * Math.PI) / 180);
    }

    try {
      const img = await getIconImage(config.iconName, config.iconColor, config.iconStrokeWidth, iconSizePx);
      ctx.drawImage(img, -iconSizePx / 2, -iconSizePx / 2, iconSizePx, iconSizePx);
    } catch (e) {
      console.error('Failed to draw icon image', e);
    }
  } else if (config.contentMode === 'text') {
    const fontSizePx = (config.fontSize / 100) * size * 0.75;
    const targetX = cx + (config.textOffsetX / 100) * (size / 2);
    const targetY = cy + (config.textOffsetY / 100) * (size / 2);

    ctx.translate(targetX, targetY);
    if (config.textRotation) {
      ctx.rotate((config.textRotation * Math.PI) / 180);
    }

    ctx.font = `${config.fontWeight} ${fontSizePx}px "${config.fontFamily}", sans-serif`;
    ctx.fillStyle = config.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Letter spacing if supported
    if ('letterSpacing' in ctx && typeof (ctx as any).letterSpacing === 'string') {
      (ctx as any).letterSpacing = `${config.letterSpacing || 0}px`;
    }

    // Dead-center text baseline without downward optical shift
    ctx.fillText(config.text || '', 0, 0);
  } else if (config.contentMode === 'image' && config.customImageDataUrl) {
    const scale = (config.imageScale ?? 75) / 100;
    const imgSizePx = scale * size;
    const targetX = cx + ((config.iconOffsetX ?? 0) / 100) * (size / 2);
    const targetY = cy + ((config.iconOffsetY ?? 0) / 100) * (size / 2);

    ctx.translate(targetX, targetY);
    if (config.iconRotation) {
      ctx.rotate((config.iconRotation * Math.PI) / 180);
    }

    await new Promise<void>((resolve) => {
      const customImg = new Image();
      customImg.onload = () => {
        const naturalW = customImg.naturalWidth || customImg.width || 1;
        const naturalH = customImg.naturalHeight || customImg.height || 1;
        const aspect = naturalW / naturalH;
        let drawW = imgSizePx;
        let drawH = imgSizePx;

        if (aspect > 1) {
          drawH = imgSizePx / aspect;
        } else {
          drawW = imgSizePx * aspect;
        }

        ctx.drawImage(customImg, -drawW / 2, -drawH / 2, drawW, drawH);
        resolve();
      };
      customImg.onerror = (e) => {
        console.error('Failed to load custom image data', e);
        resolve();
      };
      customImg.src = config.customImageDataUrl!;
      if (customImg.complete && customImg.naturalWidth > 0) {
        customImg.onload?.(new Event('load'));
      }
    });
  }

  ctx.restore();
}

// Render corner indicator / badge
function renderCornerBadge(ctx: CanvasRenderingContext2D, config: IconConfig, size: number) {
  if (!config.cornerBadge?.enabled) return;

  const badge = config.cornerBadge;
  const badgeRadius = (badge.size / 100) * (size * 0.28);
  const offset = size * 0.12;

  let bx = size - offset - badgeRadius;
  let by = offset + badgeRadius;

  if (badge.position === 'top-left') {
    bx = offset + badgeRadius;
    by = offset + badgeRadius;
  } else if (badge.position === 'bottom-right') {
    bx = size - offset - badgeRadius;
    by = size - offset - badgeRadius;
  } else if (badge.position === 'bottom-left') {
    bx = offset + badgeRadius;
    by = size - offset - badgeRadius;
  }

  ctx.save();

  // Subtle dark outer border to pop against any background
  ctx.beginPath();
  ctx.arc(bx, by, badgeRadius + 2, 0, Math.PI * 2);
  ctx.fillStyle = '#09090b';
  ctx.fill();

  // Badge fill
  ctx.beginPath();
  ctx.arc(bx, by, badgeRadius, 0, Math.PI * 2);
  ctx.fillStyle = badge.color;
  ctx.fill();

  if (badge.type === 'star') {
    // Small star inside badge
    ctx.fillStyle = '#ffffff';
    const starR = badgeRadius * 0.55;
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? starR : starR * 0.45;
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      const sx = bx + r * Math.cos(angle);
      const sy = by + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.closePath();
    ctx.fill();
  } else if (badge.type === 'count' && badge.countText) {
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${badgeRadius * 1.1}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(badge.countText.slice(0, 2), bx, by);
  }

  ctx.restore();
}

// Master Render Function: renders a complete icon configuration onto target canvas
export async function renderIconToCanvas(canvas: HTMLCanvasElement, config: IconConfig, targetSize: number = 512): Promise<void> {
  canvas.width = targetSize;
  canvas.height = targetSize;

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  ctx.clearRect(0, 0, targetSize, targetSize);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. Path of the shape
  createShapePath(ctx, config.shape, targetSize, config.borderRadius);

  // 2. Render background
  renderBackground(ctx, config, targetSize);

  // 3. Render border
  renderBorder(ctx, config, targetSize);

  // 4. Render main content (icon, text, or image)
  await renderContent(ctx, config, targetSize);

  // 5. Render corner badge if enabled
  renderCornerBadge(ctx, config, targetSize);
}

// Generates an offscreen canvas rendered at exact size and returns PNG Data URL
export async function generatePngDataUrl(config: IconConfig, size: number): Promise<string> {
  const canvas = document.createElement('canvas');
  await renderIconToCanvas(canvas, config, size);
  return canvas.toDataURL('image/png');
}

// Generates an offscreen canvas rendered at exact size and returns Blob
export async function generatePngBlob(config: IconConfig, size: number): Promise<Blob> {
  const canvas = document.createElement('canvas');
  await renderIconToCanvas(canvas, config, size);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Failed to create PNG blob'));
    }, 'image/png');
  });
}
