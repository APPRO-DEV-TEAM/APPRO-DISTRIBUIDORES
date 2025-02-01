// src/hooks/use-sync-locations.ts
import { useEffect } from "react";
import { useLocationContext } from "../contexts/location-context";
import { useDistributorsContext } from "../contexts/distributors-context";

export const useSyncLocations = () => {
  const { distributors } = useDistributorsContext();
  const { handleDistributorsLocation } = useLocationContext();

  useEffect(() => {
    console.log("Sincronizando distribuidores:", distributors);
    if (distributors.length > 0) {
      handleDistributorsLocation(distributors);
    }
  }, [distributors, handleDistributorsLocation]);
};
