// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";
import { SearchContextProvider } from "./contexts/search-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SearchContextProvider>
      <Theme>
        <App />
      </Theme>
    </SearchContextProvider>
  </StrictMode>
);
