import { useContext } from "react";
import { SearchContext } from "./search-context";
import type { SearchContextData } from "./search-context";

export const useSearch = (): SearchContextData => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return context;
};
