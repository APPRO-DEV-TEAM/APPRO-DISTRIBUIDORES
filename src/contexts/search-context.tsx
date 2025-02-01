import { createContext, useState } from "react";
import type { GeoProps } from "../types/geo.types";
import type {
  SearchProviderProps,
  PlaceProps,
} from "src/components/ui/search/search.types";

export type SearchContextData = {
  selectedPlace: PlaceProps | null;
  region: string;
  cep: string;
  geo: GeoProps[];
  inputValue: string;
  results: PlaceProps[];
  setGeo: (geo: GeoProps[]) => void;
  setCep: (cep: string) => void;
  setRegion: (region: string) => void;
  handleSearch: (value: string) => Promise<void>;
  setSelectedPlace: (place: PlaceProps) => void;
};

export const SearchContext = createContext<SearchContextData>(
  {} as SearchContextData
);

export function SearchContextProvider({
  children,
  onResultChange,
}: SearchProviderProps) {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<PlaceProps[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceProps | null>(null);
  const [region, setRegion] = useState("");
  const [cep, setCep] = useState("");
  const [geo, setGeo] = useState<GeoProps[]>([]);

  const handleSearch = async (search: string) => {
    try {
      setInputValue(search);

      if (search.length < 3) {
        setResults([]);
        return;
      }

      const apiKey = process.env.REACT_APP_GOOGLE_API_KEY; // 🔥 Use variável de ambiente
      if (!apiKey) throw new Error("API Key não definida!");

      const response = await fetch(
        "https://places.googleapis.com/v1/places:searchText",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask":
              "places.displayName,places.formattedAddress,places.location",
          },
          body: JSON.stringify({ textQuery: search }),
        }
      );

      if (!response.ok)
        throw new Error("Erro na requisição: " + response.statusText);

      const data = await response.json();
      const places = data.places || [];

      setResults(places);
      onResultChange?.({ places });
    } catch (error) {
      console.error("Erro na busca:", error);
      setResults([]);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        geo,
        cep,
        region,
        results,
        inputValue,
        selectedPlace,
        setSelectedPlace,
        handleSearch,
        setRegion,
        setCep,
        setGeo,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
