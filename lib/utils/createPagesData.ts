import fs from "fs/promises";
import path from "path";
import type { Page } from "@/types/page.types";

const filePath = path.join(process.cwd(), "data/pages.ts");

export async function createPagesData(pages: Page[]) {
  const content = await fs.readFile(filePath, "utf-8");
  const [header, oldArray] = content.split(" = ");
  if (!oldArray) throw new Error("Recipes array not found");
  const newArrayString = JSON.stringify(pages, null, 2);
  const updated = `${header} = ${newArrayString};`;
  await fs.writeFile(filePath, updated, "utf-8");
}
