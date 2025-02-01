import { useContext } from "react";
import { LocationContext } from "../contexts/location-context";

export const useLocate = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return context;
};
