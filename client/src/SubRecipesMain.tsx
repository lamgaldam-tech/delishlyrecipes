import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/Layout";
import { SubRecipes } from "@/views/SubRecipes";
import { recipes } from "@/data/recipes";
import { Recipe } from "@/types/recipe.types";
import "@/globals.css";

function getTypeAndNameFromURL(): {
  type: "tags" | "categories";
  name: string;
} | null {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  if (
    pathParts.length === 3 &&
    (pathParts[1] === "tags" || pathParts[1] === "categories")
  ) {
    return { type: pathParts[1], name: pathParts[2] };
  }
  return null;
}

const params = getTypeAndNameFromURL();

let subRecipes: Recipe[] = [];
if (params) {
  const nameLower = params.name.toLowerCase().replace(/-/g, " ");
  if (params.type === "tags") {
    subRecipes = recipes.filter((r) =>
      r.tags.some((t) => t.tag.toLowerCase() === nameLower),
    );
  } else if (params.type === "categories") {
    subRecipes = recipes.filter(
      (r) => r.category.name.toLowerCase() === nameLower,
    );
  }
}

ReactDOM.createRoot(document.querySelector("body")!).render(
  <React.StrictMode>
    <Layout>
      {params ? (
        <SubRecipes
          type={params.type}
          name={params.name}
          recipes={subRecipes}
        />
      ) : (
        <p>Invalid URL</p>
      )}
    </Layout>
  </React.StrictMode>,
);
