import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pages } from "../src/data/pages.ts";
import type { Page } from "../src/types/pages.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("__dirname:", __dirname);

const root = path.resolve(__dirname, "../");

// --- Helper to delete all HTML files recursively ---
function deleteHtmlFiles(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      deleteHtmlFiles(fullPath);
    } else if (entry.isFile() && fullPath.endsWith(".html")) {
      fs.unlinkSync(fullPath);
      console.log("Deleted:", fullPath);
    }
  }
}

// --- Simple template function for Page ---
const template = (page: Page) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${page.title}</title>
</head>
<body>
  <div id="root">
    <h1>${page.title}</h1>
    <div>${page.description}</div>
  </div>
  <script type="module" src=${page.script}></script>
</body>
</html>`;
};

// --- Delete old HTML files first ---
deleteHtmlFiles(root);

// --- Write HTML files ---
for (const page of pages) {
  // resolve the full path
  const filePath = path.join(root, page.html);

  // make sure directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // write the file
  fs.writeFileSync(filePath, template(page), "utf-8");
  console.log("Written:", filePath);
}
