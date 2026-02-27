import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const REPO_RAW =
  "https://raw.githubusercontent.com/lamgaldam-tech/delishlyrecipes-dashboard/main/data/recipes.json";

export async function fetchRecipes(): Promise<void> {
  try {
    // fetch the JSON from GitHub
    const res = await fetch(REPO_RAW);
    if (!res.ok) throw new Error("Failed to fetch recipes.json");

    const recipes = await res.json();

    // Optional: write locally to recipes.ts
    const outputPath = path.join(process.cwd(), "src", "data", "recipes.ts");
    const tsContent = `import type { Recipe } from "../types/recipe.types.ts";\n\nexport const recipes: Recipe[] = ${JSON.stringify(
      recipes,
      null,
      2,
    )};\n`;

    fs.writeFileSync(outputPath, tsContent, "utf-8");
  } catch (err) {
    console.error("Error fetching recipes:", err);
  }
}
