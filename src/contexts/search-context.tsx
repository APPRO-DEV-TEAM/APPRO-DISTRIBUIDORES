import { createContext, useState } from "react";
import type {
  SearchProviderProps,
  PlaceProps,
} from "src/components/ui/search/search.types";

export type SearchContextData = {
  results: PlaceProps[];
  handleSearch: (value: string) => Promise<void>;
  getInputValue: () => string;
  getPredictionsResults: () => PlaceProps[];
};

export const SearchContext = createContext<SearchContextData | null>(null);

export const SearchContextProvider = ({
  children,
  onResultChange,
}: SearchProviderProps) => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<PlaceProps[]>([]);

  const handleSearch = async (search: string) => {
    try {
      setInputValue(search);

      if (search.length < 5) {
        setResults([]);
        return;
      }

      const apiKey = "AIzaSyATFFlBVvbstEAytcAChHNX73TIrsFmGzU"; // Evite expor a API key diretamente
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

      setResults(places);
      onResultChange?.({ places });
    } catch (error) {
      console.error("Erro na busca:", error);
      setResults([]);
    }
  };

  const getInputValue = () => inputValue;
  const getPredictionsResults = () => results;

  return (
    <SearchContext.Provider
      value={{ results, handleSearch, getInputValue, getPredictionsResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};
