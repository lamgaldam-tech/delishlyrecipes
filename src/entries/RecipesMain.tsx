import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/Layout";
import { Recipes } from "@/pages/Recipes";
import { recipes } from "@/data/recipes";
import "@/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <Recipes
        recipes={recipes}
        onCardClick={(r) => (window.location.href = r.url)}
      />
    </Layout>
  </React.StrictMode>,
);
