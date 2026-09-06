/**
 * Utility to process, scale, and compress images selected from the device gallery / file picker.
 * Returns a high-quality, web-optimized Data URL (base64 string).
 */
export async function processGalleryImage(
  file: File,
  maxDimension = 1200,
  quality = 0.88
): Promise<{ dataUrl: string; sizeKb: number; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Selected file is not an image.'));
    }

    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Failed to read image file.'));
    };

    reader.onload = () => {
      const img = new Image();
      img.onerror = () => {
        reject(new Error('Failed to parse image data.'));
      };

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio scaling
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          // Fallback to raw data url if canvas is unsupported
          const rawUrl = reader.result as string;
          const sizeKb = Math.round(rawUrl.length * 0.75 / 1024);
          return resolve({ dataUrl: rawUrl, sizeKb, width: img.width, height: img.height });
        }

        // Better image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Keep PNG if transparent or small, else convert to JPEG for optimal size
        const mimeType = file.type === 'image/png' && file.size < 500 * 1024 ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, quality);
        const sizeKb = Math.round(dataUrl.length * 0.75 / 1024);

        resolve({ dataUrl, sizeKb, width, height });
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}
