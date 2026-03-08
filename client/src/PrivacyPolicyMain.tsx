import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "@/components/Layout";
import { PrivacyPolicy } from "@/views/PrivacyPolicy";
import "@/globals.css";

ReactDOM.createRoot(document.querySelector("body")!).render(
  <React.StrictMode>
    <Layout>
      <PrivacyPolicy />
    </Layout>
  </React.StrictMode>,
);
