import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/Layout";
import { Contact } from "@/pages/Contact";
import "@/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <Contact />
    </Layout>
  </React.StrictMode>,
);
