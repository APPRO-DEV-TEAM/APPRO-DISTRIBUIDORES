import { createContext, useCallback, useState, ReactNode } from "react";
import { useURLState } from "@/hooks/use-url-state";
import type { PlaceProps } from "@/types/search.types";

export type SearchContextData = {
  predictionResults: PlaceProps[];
  setPredictionResults: (places: PlaceProps[]) => void;
  selectedPlace: PlaceProps | null;
  loadPredictions: (value: string) => Promise<void>;
  onPlaceSelected: (place: PlaceProps) => void;
};

export const SearchContext = createContext<SearchContextData | null>(null);

interface SearchProviderProps {
  children: ReactNode;
  onResultChange?: (result: { places: PlaceProps[] }) => void;
}

export const SearchContextProvider = ({
  children,
  onResultChange,
}: SearchProviderProps) => {
  const [search, setSearch] = useURLState(
    "q",
    "",
    encodeURIComponent,
    decodeURIComponent
  );
  const [predictionResults, setPredictionResults] = useState<PlaceProps[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceProps | null>(null);

  const loadPredictions = useCallback(
    async (search: string) => {
      try {
        setSearch(search);

        if (search.length < 5) {
          setPredictionResults([]);
          return;
        }

        const apiKey = "AIzaSyATFFlBVvbstEAytcAChHNX73TIrsFmGzU";
        if (!apiKey) throw new Error("API Key não definida!");

        const response = await fetch(
          "https://places.googleapis.com/v1/places:searchText",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": apiKey,
              "X-Goog-FieldMask":
                "places.displayName,places.formattedAddress,places.location,places.id",
            },
            body: JSON.stringify({ textQuery: search }),
          }
        );

        if (!response.ok)
          throw new Error("Erro na requisição: " + response.statusText);

        const data = await response.json();
        const places = data.places || [];

        setPredictionResults(places);
        onResultChange?.({ places });
      } catch (error) {
        console.error("Erro na busca:", error);
        setPredictionResults([]);
      }
    },
    [setSearch, onResultChange]
  );

  const onPlaceSelected = (place: PlaceProps) => {
    setSearch(place.displayName.text);
    setPredictionResults([]);
    setSelectedPlace(place);
    console.log("Place selected:", place, search);
  };

  return (
    <SearchContext.Provider
      value={{
        predictionResults,
        setPredictionResults,
        loadPredictions,
        onPlaceSelected,
        selectedPlace,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
