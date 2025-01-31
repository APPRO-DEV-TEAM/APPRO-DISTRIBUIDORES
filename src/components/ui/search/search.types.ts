// search.types.ts
export interface PredictionsResultsProps {
  places: PlaceProps[];
}

export interface PlaceProps {
  displayName: string;
  formattedAddress: string;
}

export interface SearchProviderProps {
  children: React.ReactNode;
  onResultChange: (data: PredictionsResultsProps) => void;
}

export interface SearchItemProps {
  renderItem: (place: PlaceProps) => React.ReactNode;
}

export interface SearchListProps {
  children: React.ReactNode;
}

export interface SearchRootProps {
  children: React.ReactNode;
  onResultChange: (data: PredictionsResultsProps) => void;
}
