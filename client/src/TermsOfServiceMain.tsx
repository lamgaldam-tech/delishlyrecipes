import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/Layout";
import { TermsOfService } from "@/views/TermsOfService";
import "@/globals.css";

ReactDOM.createRoot(document.querySelector("body")!).render(
  <React.StrictMode>
    <Layout>
      <TermsOfService />
    </Layout>
  </React.StrictMode>,
);
