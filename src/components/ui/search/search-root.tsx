import { SearchContextProvider } from "../../../contexts/search-context";
import type { SearchRootProps } from "../../../types/search.types";

export function SearchRoot({ children, onResultChange }: SearchRootProps) {
  return (
    <SearchContextProvider onResultChange={onResultChange}>
      {children}
    </SearchContextProvider>
  );
}
