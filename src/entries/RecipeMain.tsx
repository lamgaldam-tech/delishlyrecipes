import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/Layout";
import { RecipePage } from "@/pages/Recipe";
import { recipes } from "@/data/recipes";
import "@/global.css";

const url = window.location.pathname;
const parts = url.split("/").filter(Boolean);
const slug = parts[parts.length - 1];
const recipe = recipes.find((r) => r.slug === slug);

ReactDOM.createRoot(document.querySelector("body")!).render(
  <React.StrictMode>
    <Layout>
      {recipe ? (
        <RecipePage
          recipe={recipe}
        />
      ) : (
        <div>Recipe not found</div>
      )}
    </Layout>
  </React.StrictMode>,
);
