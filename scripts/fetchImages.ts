import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const API_URL = `https://api.github.com/repos/lamgaldam-tech/delishlyrecipes-dashboard/contents/public?ref=main`;

export async function fetchImages(): Promise<void> {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch folder contents");

    const files = (await res.json()) as any;

    const outputDir = path.join(process.cwd(), "public", "images");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const file of files) {
      if (file.type !== "file") continue;

      const fileRes = await fetch(file.download_url);
      if (!fileRes.ok) throw new Error(`Failed to fetch ${file.name}`);

      const buffer = await fileRes.arrayBuffer();
      const filePath = path.join(outputDir, file.name);

      fs.writeFileSync(filePath, Buffer.from(buffer));
      console.log(`Saved: ${file.name}`);
    }

    console.log("Public folder synced successfully.");
  } catch (err) {
    console.error("Error fetching public folder:", err);
  }
}
