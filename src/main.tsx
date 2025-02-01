// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";
import { SearchContextProvider } from "./contexts/search-context.tsx";
import { LocationContextProvider } from "./contexts/location-context.tsx";
import { DistributorsContextProvider } from "./contexts/distributors-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocationContextProvider>
      <DistributorsContextProvider>
        <SearchContextProvider>
          <Theme>
            <App />
          </Theme>
        </SearchContextProvider>
      </DistributorsContextProvider>
    </LocationContextProvider>
  </StrictMode>
);
