import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { App } from "@/App";
import { AppShell } from "@/features/shared/components/AppShell";
import { queryClient } from "@/features/shared/lib/query-client";
import "@/index.css";

const rootElement = document.getElementById("root");
if (rootElement === null) throw new Error("Missing #root element");

createRoot(rootElement).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <NuqsAdapter>
          <QueryClientProvider client={queryClient}>
            <AppShell>
              <App />
            </AppShell>
          </QueryClientProvider>
        </NuqsAdapter>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
