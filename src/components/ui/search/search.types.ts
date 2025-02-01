export interface PlaceProps {
  id: string;
  formattedAddress: string;
  displayName: {
    text: string;
    languageCode: string;
  };
}

export interface PredictionsResultsProps {
  places: PlaceProps[];
}

export interface SearchProviderProps {
  children: React.ReactNode;
  onResultChange?: (data: PredictionsResultsProps) => void;
}

export interface SearchRootProps {
  children: React.ReactNode;
  onResultChange?: (data: PredictionsResultsProps) => void;
}

export interface SearchItemProps {
  renderItem: (place: PlaceProps) => React.ReactNode;
}

export interface SearchListProps {
  children: React.ReactNode;
}
