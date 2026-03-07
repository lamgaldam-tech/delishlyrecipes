import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/Layout";
import { Recipes } from "@/views/Recipes";
import { recipes } from "@/data/recipes";
import "@/globals.css";

ReactDOM.createRoot(document.querySelector("body")!).render(
  <React.StrictMode>
    <Layout>
      <Recipes recipes={recipes} />
    </Layout>
  </React.StrictMode>,
);
