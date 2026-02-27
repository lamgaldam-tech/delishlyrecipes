import { fetchRecipes } from "./fetchRecipes.ts";
import { fetchImages } from "./fetchImages.ts";
import { buildStaticPages } from "./buildStaticPages.ts";

(async () => {
  await fetchRecipes();
  await fetchImages();
  buildStaticPages();
})();
