import fs from "fs";
import path from "path";

const publicRoot = path.join(process.cwd(), "public");

export function readPublicPngDimensions(publicSrc: string): { width: number; height: number } | null {
  const relativePath = publicSrc.replace(/^\//, "");
  const filePath = path.resolve(publicRoot, relativePath);

  if (!filePath.startsWith(publicRoot + path.sep) && filePath !== publicRoot) {
    return null;
  }

  try {
    const buffer = fs.readFileSync(filePath);
    if (buffer.length < 24 || buffer[0] !== 0x89) return null;

    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  } catch {
    return null;
  }
}
