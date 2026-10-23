import fs from 'fs';
import path from 'path';

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

// Ensure public/uploads directory exists
try {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (e) {
  console.warn('[Storage] Could not create uploads directory:', e);
}

/**
 * Saves a base64 Data URI to a physical file in public/uploads/ and returns the web-accessible URL.
 * If dataUri is already a URL or relative path, it is returned untouched.
 */
export function saveBase64Image(dataUri: string, prefix = 'upload'): string {
  if (!dataUri || typeof dataUri !== 'string') return dataUri;

  // If already a standard file URL, keep it
  if (!dataUri.startsWith('data:image/')) {
    return dataUri;
  }

  try {
    const matches = dataUri.match(/^data:image\/([a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (!matches || matches.length < 3) {
      return dataUri;
    }

    let ext = matches[1].toLowerCase();
    if (ext === 'jpeg') ext = 'jpg';
    if (ext === 'svg+xml') ext = 'svg';

    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Ensure directory exists at write time
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }

    const safePrefix = prefix.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${safePrefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const filePath = path.join(UPLOADS_DIR, filename);

    fs.writeFileSync(filePath, buffer);
    console.log(`[Storage] Saved uploaded image to disk: ${filename} (${Math.round(buffer.length / 1024)} KB)`);

    return `/uploads/${filename}`;
  } catch (err) {
    console.error('[Storage] Error saving base64 image to disk:', err);
    return dataUri;
  }
}
