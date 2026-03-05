import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/Layout";
import { Home } from "@/views/Home";
import { recipes } from "@/data/recipes";
import "@/globals.css";

ReactDOM.createRoot(document.querySelector("body")!).render(
  <React.StrictMode>
    <Layout>
      <Home recipes={recipes} />
    </Layout>
  </React.StrictMode>,
);
