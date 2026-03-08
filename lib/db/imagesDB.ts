import fs from "fs/promises";
import path from "path";

const imagesDir = path.join(process.cwd(), "public/images");

async function add(slug: string, file: File) {
  const ext = file.type.split("/")[1] || "jpg";
  const filePath = path.join(imagesDir, `${slug}.${ext}`);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);
}

async function update(oldSlug: string, newSlug: string, file: File) {
  await deleteImage(oldSlug);
  return add(newSlug, file);
}

async function deleteImage(slug: string) {
  const files = await fs.readdir(imagesDir);
  const file = files.find((f) => f.startsWith(`${slug}.`));
  if (!file) return;
  const filePath = path.join(imagesDir, file);
  await fs.unlink(filePath);
}

export const ImagesDB = {
  add,
  update,
  delete: deleteImage,
};
