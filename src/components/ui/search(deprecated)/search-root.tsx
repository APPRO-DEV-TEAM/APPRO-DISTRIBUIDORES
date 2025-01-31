import { SearchProvider } from "./search-provider";
import { PredictionsResultsProps } from "./search.types";

interface SearchRootProps {
  children: React.ReactNode;
  onResultChange: (data: PredictionsResultsProps) => void;
}

export function SearchRoot({ children, onResultChange }: SearchRootProps) {
  return (
    <SearchProvider onResultChange={onResultChange}>{children}</SearchProvider>
  );
}
