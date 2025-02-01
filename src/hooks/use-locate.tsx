// src/hooks/use-locate.tsx
import { useLocationContext } from "../contexts/location-context";

export const useLocate = () => {
  const context = useLocationContext();

  if (!context) {
    throw new Error("useLocate must be used within a LocationProvider");
  }

  return context;
};
