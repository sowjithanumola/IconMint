import { IconConfig } from '../types/icon';
import { generatePngBlob } from './canvasRenderer';

/**
 * Creates a valid multi-resolution Windows ICO file containing 16x16 and 32x32 PNG-compressed frames.
 * Returns a Blob with MIME type "image/x-icon".
 */
export async function generateIcoBlob(config: IconConfig, sizes: number[] = [16, 32, 48]): Promise<Blob> {
  const pngBlobs: { size: number; buffer: ArrayBuffer }[] = [];

  for (const s of sizes) {
    const blob = await generatePngBlob(config, s);
    const buffer = await blob.arrayBuffer();
    pngBlobs.push({ size: s, buffer });
  }

  const numImages = pngBlobs.length;
  const headerLength = 6;
  const directoryEntryLength = 16;
  const totalHeaderSize = headerLength + numImages * directoryEntryLength;

  let currentOffset = totalHeaderSize;
  const totalFileSize = totalHeaderSize + pngBlobs.reduce((acc, curr) => acc + curr.buffer.byteLength, 0);

  const icoBuffer = new ArrayBuffer(totalFileSize);
  const view = new DataView(icoBuffer);

  // 1. Write ICONDIR Header
  view.setUint16(0, 0, true);          // Reserved. Must always be 0.
  view.setUint16(2, 1, true);          // Image type: 1 for icon (.ICO)
  view.setUint16(4, numImages, true);  // Number of images

  // 2. Write ICONDIRENTRY for each image
  let entryOffset = headerLength;
  for (const item of pngBlobs) {
    const width = item.size >= 256 ? 0 : item.size;
    const height = item.size >= 256 ? 0 : item.size;

    view.setUint8(entryOffset + 0, width);             // Width
    view.setUint8(entryOffset + 1, height);            // Height
    view.setUint8(entryOffset + 2, 0);                 // Color palette: 0 for 256+ colors
    view.setUint8(entryOffset + 3, 0);                 // Reserved: must be 0
    view.setUint16(entryOffset + 4, 1, true);          // Color planes: 1
    view.setUint16(entryOffset + 6, 32, true);         // Bits per pixel: 32 (RGBA)
    view.setUint32(entryOffset + 8, item.buffer.byteLength, true); // Size of image data in bytes
    view.setUint32(entryOffset + 12, currentOffset, true);         // File offset to image data

    // Copy PNG bytes into payload section
    new Uint8Array(icoBuffer, currentOffset, item.buffer.byteLength).set(new Uint8Array(item.buffer));

    currentOffset += item.buffer.byteLength;
    entryOffset += directoryEntryLength;
  }

  return new Blob([icoBuffer], { type: 'image/x-icon' });
}
