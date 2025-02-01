// src/hooks/use-locate.tsx
import { useLocationContext } from "../contexts/location-context";

export function useLocate() {
  const context = useLocationContext();

  if (!context) {
    throw new Error("useLocate must be used within a LocationProvider");
  }

  return context;
}
