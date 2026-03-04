import fs from "fs/promises";
import path from "path";
import type { Recipe } from "@/types/recipe.types";

const filePath = path.join(process.cwd(), "data/recipes.ts");

export async function load(): Promise<Recipe[]> {
  const content = await fs.readFile(filePath, "utf-8");
  const match = content.split(" = ")[1];
  if (!match) throw new Error("Recipes array not found");
  return new Function(`return ${match}`)() as Recipe[];
}

export async function save(recipes: Recipe[]) {
  const content = await fs.readFile(filePath, "utf-8");
  const [header, oldArray] = content.split(" = ");
  if (!oldArray) throw new Error("Recipes array not found");
  const newArrayString = JSON.stringify(recipes, null, 2);
  const updated = `${header} = ${newArrayString};`;
  await fs.writeFile(filePath, updated, "utf-8");
}

async function get(): Promise<Recipe[]> {
  return load();
}

async function add(recipe: Recipe) {
  const recipes = await load();

  const exists = recipes.some((r) => r.slug === recipe.slug);
  if (exists) {
    throw new Error(`Recipe with slug "${recipe.slug}" already exists`);
  }

  recipes.push(recipe);
  await save(recipes);
  return recipe;
}

async function update(recipe: Recipe) {
  const recipes = await load();

  const index = recipes.findIndex((r) => r.slug === recipe.slug);
  if (index === -1) throw new Error("Recipe not found");

  recipes[index] = recipe;
  await save(recipes);
  return recipes[index];
}

async function deleteRecipe(slug: string) {
  const recipes = await load();
  const filtered = recipes.filter((r) => r.slug !== slug);
  await save(filtered);
  return true;
}

export const RecipesDB = {
  get,
  add,
  update,
  delete: deleteRecipe,
};
