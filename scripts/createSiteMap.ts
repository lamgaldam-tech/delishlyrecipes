import path from "path";
import fs from "fs/promises";
import { pages } from "../data/pages.ts";

const BASE_URL = "https://delishlyrecipes.com";
const siteMapPath = path.join(process.cwd(), "public/sitemap.xml");

async function updateSiteMap() {
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xmlContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const page of pages) {
    xmlContent += `  <url>\n`;
    xmlContent += `    <loc>${BASE_URL}/${page.html.replace(/index\.html$/, "")}</loc>\n`;
    xmlContent += `  </url>\n`;
  }

  xmlContent += `</urlset>\n`;

  await fs.writeFile(siteMapPath, xmlContent, "utf-8");
}

updateSiteMap();
