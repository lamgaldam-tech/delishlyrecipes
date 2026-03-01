import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/Layout";
import { Recipes } from "@/pages/Recipes";
import { recipes } from "@/data/recipes";
import "@/global.css";

// temp
import { renderToString } from "react-dom/server";
import { RecipePage } from "@/pages/Recipe";
let html = [];
for (const r of recipes) {
  html.push(
    renderToString(<RecipePage recipe={r} />).replace(/\sclass="[^"]*"/g, "")
  );
}
console.log(JSON.stringify(html, null, 2));

ReactDOM.createRoot(document.querySelector("body")!).render(
  <React.StrictMode>
    <Layout>
      <Recipes recipes={recipes} />
    </Layout>
  </React.StrictMode>,
);
