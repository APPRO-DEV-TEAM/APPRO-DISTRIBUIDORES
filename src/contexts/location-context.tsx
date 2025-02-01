// src/contexts/location-context.tsx
import {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from "react";
import type { GeoProps } from "../types/geo.types";
import { DistributorProps } from "../types/distributors.types";

// Defina o tipo do contexto
type LocationContextData = {
  handleDistributorsLocation: (distributors: DistributorProps[]) => void;
  geoDistributorsLocation: GeoProps[];
};

// Crie o contexto
const LocationContext = createContext<LocationContextData | null>(null);

// Provider corrigido
export const LocationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [geoDistributorsLocation, setGeoDistributorsLocation] = useState<
    GeoProps[]
  >([]);

  const handleDistributorsLocation = useCallback(
    (distributors: DistributorProps[]) => {
      const newLocations = distributors.map((distributor) => ({
        lat: distributor.latitude,
        lng: distributor.longitude,
        distributorId: distributor.id.toString(), // Converta para string
      }));
      setGeoDistributorsLocation(newLocations);
    },
    []
  );

  return (
    <LocationContext.Provider
      value={{ handleDistributorsLocation, geoDistributorsLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

// Hook corrigido para Fast Refresh
export const useLocationContext = (): LocationContextData => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationContextProvider"
    );
  }
  return context;
};
