import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/Layout";
import { RecipeDetail } from "@/pages/Recipe";
import { recipes } from "@/data/recipes";
import "@/global.css";

const url = window.location.pathname;
const parts = url.split("/").filter(Boolean);
const slug = parts[parts.length - 1];
const recipe = recipes.find(
  (r) => r.title.toLowerCase().replaceAll(" ", "-") === slug,
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      {recipe ? <RecipeDetail recipe={recipe} /> : <div>Recipe not found</div>}
    </Layout>
  </React.StrictMode>,
);
