import { useContext } from "react";
import { SearchContext } from "../contexts/search-context";

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearch deve ser usado dentro de um SearchContextProvider"
    );
  }

  return context;
}
