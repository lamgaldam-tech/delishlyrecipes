import { recipes } from "./recipes.ts";
import type { Page } from "../types/page.types.ts";

const mainPages: Page[] = [
  {
    html: "index.html",
    script: "./src/entries/HomeMain.tsx",
    title: "Home",
    description: "Discover delicious homemade recipes.",
  },
  {
    html: "about/index.html",
    script: "../src/entries/AboutMain.tsx",
    title: "About",
    description: "Learn more about Delishly Recipes.",
  },
  {
    html: "contact/index.html",
    script: "../src/entries/ContactMain.tsx",
    title: "Contact",
    description: "Get in touch with us.",
  },
  {
    html: "recipes/index.html",
    script: "../src/entries/RecipesMain.tsx",
    title: "All Recipes",
    description: "Browse all available recipes.",
  },
];

const recipePages: Page[] = recipes.map((recipe) => ({
  html: `recipes/${recipe.slug}/index.html`,
  script: "../../src/entries/RecipeMain.tsx",
  title: recipe.title,
  description: recipe.description,
}));

export const pages: Page[] = [...mainPages, ...recipePages];
