import { useState, useCallback } from "react";
import { SearchContext } from "./search-context";
import type { SearchProviderProps, PlaceProps } from "./search.types";

export const SearchProvider = ({
  children,
  onResultChange,
}: SearchProviderProps) => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<PlaceProps[]>([]);

  const handleSearch = useCallback(
    async (search: string) => {
      try {
        setInputValue(search);

        if (search.length < 3) {
          setResults([]);
          return;
        }

        const response = await fetch(
          "https://places.googleapis.com/v1/places:searchText",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": "AIzaSyATFFlBVvbstEAytcAChHNX73TIrsFmGzU",
              "X-Goog-FieldMask": "places.displayName,places.formattedAddress",
            },
            body: JSON.stringify({ textQuery: search }),
          }
        );

        if (!response.ok) throw new Error("Erro na requisição");

        const data = await response.json();
        const places = data.places || [];
        setResults(places);
        onResultChange({ places });
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
    },
    [onResultChange]
  );

  return (
    <SearchContext.Provider value={{ inputValue, results, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
