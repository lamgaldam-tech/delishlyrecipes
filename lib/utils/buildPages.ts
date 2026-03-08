import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import type { Page } from "@/types/page.types";

function deleteHtmlFiles(dir: string) {
  const entries = fsSync.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      deleteHtmlFiles(fullPath);
      const remaining = fsSync.readdirSync(fullPath);
      if (remaining.length === 0) {
        fsSync.rmdirSync(fullPath);
        console.log("Deleted empty folder:", fullPath);
      }
    } else if (entry.isFile() && fullPath.endsWith(".html")) {
      fsSync.unlinkSync(fullPath);
      console.log("Deleted:", fullPath);
    }
  }
}

function template(page: Page) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  ${page.header}
</head>
<body>
  ${page.body}
  <script type="module" src="${page.script}"></script>
</body>
</html>`;
}

async function createPagesData(pages: Page[]) {
  const filePath = path.join(process.cwd(), "data/pages.ts");
  const content = await fs.readFile(filePath, "utf-8");
  const [header, oldArray] = content.split(" = ");
  if (!oldArray) throw new Error("Pages array not found");
  const newArrayString = JSON.stringify(pages, null, 2);
  const updated = `${header} = ${newArrayString};`;
  await fs.writeFile(filePath, updated, "utf-8");
}

export async function buildPages(pages: Page[]) {
  await createPagesData(pages);

  const root = path.join(process.cwd(), "client");
  deleteHtmlFiles(root);

  for (const page of pages) {
    const filePath = path.join(root, page.html);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, template(page), "utf-8");
    console.log("Written:", filePath);
  }
}
