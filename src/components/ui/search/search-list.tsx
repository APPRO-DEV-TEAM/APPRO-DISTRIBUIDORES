import { useSearch } from "./search-hooks";

interface SearchListProps {
  children: React.ReactNode;
}

export function SearchList({ children }: SearchListProps) {
  const { results } = useSearch();

  return results.length > 0 ? (
    <div className="mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
      {children}
    </div>
  ) : null;
}
