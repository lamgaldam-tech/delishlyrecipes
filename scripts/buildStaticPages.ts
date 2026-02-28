import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { pages } from "../src/data/pages.ts";
import type { Page } from "../src/types/page.types.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Helper: delete all HTML files recursively ---
function deleteHtmlFiles(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively delete files inside
      deleteHtmlFiles(fullPath);

      // Check if directory is now empty
      const remaining = fs.readdirSync(fullPath);
      if (remaining.length === 0) {
        fs.rmdirSync(fullPath);
        console.log("Deleted empty folder:", fullPath);
      }
    } else if (entry.isFile() && fullPath.endsWith(".html")) {
      fs.unlinkSync(fullPath);
      console.log("Deleted:", fullPath);
    }
  }
}

// --- Helper: template function for Page ---
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

// --- Main function ---
export function buildStaticPages(rootDir?: string) {
  const root = rootDir || path.resolve(__dirname, "../");

  console.log("Building pages in:", root);

  // Delete old HTML files
  deleteHtmlFiles(root);

  // Write new HTML files
  for (const page of pages) {
    const filePath = path.join(root, page.html);

    // Ensure directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write HTML file
    fs.writeFileSync(filePath, template(page), "utf-8");
    console.log("Written:", filePath);
  }
}
