import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/Layout";
import { SubRecipes } from "@/views/SubRecipes";
import { recipes } from "@/data/recipes";
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

ReactDOM.createRoot(document.querySelector("body")!).render(
  <React.StrictMode>
    <Layout>
      {params ? (
        <SubRecipes type={params.type} name={params.name} recipes={recipes} />
      ) : (
        <p>Invalid URL</p>
      )}
    </Layout>
  </React.StrictMode>,
);
