import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/Layout";
import { About } from "@/views/About";
import "@/globals.css";

ReactDOM.createRoot(document.querySelector("body")!).render(
  <React.StrictMode>
    <Layout>
      <About />
    </Layout>
  </React.StrictMode>,
);
