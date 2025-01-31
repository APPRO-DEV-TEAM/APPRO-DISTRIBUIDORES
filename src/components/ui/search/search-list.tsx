import { useSearch } from "./search-hooks";

interface SearchListProps {
  children: React.ReactNode;
}

export function SearchList({ children }: SearchListProps) {
  const { results } = useSearch();
  return results.length > 0 ? (
    <div className="flex flex-col gap-2 bg-amber-500">{children}</div>
  ) : null;
}
