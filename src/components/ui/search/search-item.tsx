import { PlaceProps } from "./search.types";
import { useSearch } from "./search-hooks";

interface SearchItemProps {
  renderItem: (place: PlaceProps) => React.ReactNode;
}

export function SearchItem({ renderItem }: SearchItemProps) {
  const { results } = useSearch();
  return <>{results.map((place) => renderItem(place))}</>;
}
