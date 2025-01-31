import { SearchProvider } from "./search-provider";
import type { SearchRootProps } from "./search.types";

export function SearchRoot({ children, onResultChange }: SearchRootProps) {
  return (
    <SearchProvider onResultChange={onResultChange}>{children}</SearchProvider>
  );
}
