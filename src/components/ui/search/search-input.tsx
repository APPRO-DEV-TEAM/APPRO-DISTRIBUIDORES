import { useSearch } from "./search-hooks";

export function SearchInput() {
  const { inputValue, handleSearch } = useSearch();

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => handleSearch(e.target.value)}
      className="text-gray-800 placeholder:text-gray-600"
    />
  );
}
