import { PlaceProps } from "./search.types";
import { useSearch } from "../../../hooks/use-search";

interface SearchItemProps {
  renderItem: (place: PlaceProps) => React.ReactNode;
}

export function SearchItem({ renderItem }: SearchItemProps) {
  const { results } = useSearch();
  return <>{results.map((place) => renderItem(place))}</>;
}
