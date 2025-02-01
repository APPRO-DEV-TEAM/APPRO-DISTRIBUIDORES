import { useSearch } from "../../../hooks/use-search";

interface SearchListProps {
  children: React.ReactNode;
}

export function SearchList({ children }: SearchListProps) {
  const { results } = useSearch();

  return results.length > 0 ? (
    <div className="absolute mt-2 max-h-96 w-[70vw] overflow-y-scroll rounded-lg border border-gray-200 bg-white shadow-lg">
      {children}
    </div>
  ) : null;
}
