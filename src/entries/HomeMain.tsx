import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import "@/global.css";

ReactDOM.createRoot(document.querySelector("body")!).render(
  <React.StrictMode>
    <Layout>
      <Home />
    </Layout>
  </React.StrictMode>,
);
