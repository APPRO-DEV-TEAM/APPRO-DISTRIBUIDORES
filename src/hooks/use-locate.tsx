import { useContext } from "react";
import { LocationContext } from "../contexts/location-context";

export const useLocate = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useLocate must be used within a LocationProvider");
  }

  return context;
};
