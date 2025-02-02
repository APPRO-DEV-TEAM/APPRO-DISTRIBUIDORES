import { PlaceProps } from "@/types/search.types";

interface SearchListProps {
  renderItem: (place: PlaceProps) => React.ReactNode;
  predictions?: PlaceProps[];
  isOpen?: boolean;
}

export function SearchList({
  renderItem,
  isOpen = true,
  predictions = [],
}: SearchListProps) {
  return predictions.length > 0 && isOpen ? (
    <div className="absolute mt-2 max-h-96 w-[70vw] overflow-y-scroll rounded-lg border border-gray-200 bg-white shadow-lg">
      {predictions.map((place) => renderItem(place))}
    </div>
  ) : null;
}
