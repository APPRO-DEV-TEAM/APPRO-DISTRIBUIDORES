import { createContext } from "react";
import type { PlaceProps } from "./search.types";

export interface SearchContextData {
  inputValue: string;
  results: PlaceProps[];
  handleSearch: (value: string) => Promise<void>;
}

export const SearchContext = createContext<SearchContextData | undefined>(
  undefined
);
