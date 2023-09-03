import * as path from 'node:path';

import * as fs from 'fs-extra';
import tinify from 'tinify';

export async function imageOptimization(
  image: any,
  key: string,
): Promise<string> {
  const imageBuffer = image.buffer;
  tinify.key = key;

  try {
    const compressedImage = await tinify.fromBuffer(imageBuffer).toBuffer();

    const outputPath = path.join(__dirname, '../..', 'user', 'images');

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    const uniqueFileName = Date.now() + '_compressed.jpg';

    const filePath = path.join(outputPath, uniqueFileName);

    fs.writeFileSync(filePath, compressedImage);

    return filePath;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Image processing failed');
  }
}
