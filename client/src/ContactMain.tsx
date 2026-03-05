import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/Layout";
import { Contact } from "@/views/Contact";
import "@/globals.css";

ReactDOM.createRoot(document.querySelector("body")!).render(
  <React.StrictMode>
    <Layout>
      <Contact />
    </Layout>
  </React.StrictMode>,
);
