// src/contexts/location-context.tsx
import { createContext, useState } from "react";
import type { GeoProps } from "../types/geo.types";
import { DistributorProps } from "@/types/distributors.types";

type LocationContextData = {
  handleDistributorsLocation: (distributors: DistributorProps[]) => void;
  geoDistributorsLocation: () => GeoProps[] | null;
};

export const LocationContext = createContext<LocationContextData>(
  {} as LocationContextData
);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [distributorsGeolocation, setDistributorsGeolocation] = useState<
    GeoProps[] | null
  >(null);

  // const [selectedPlace, setSelectedPlace] = useState<PlaceProps | null>(null);
  // const [cep, setCep] = useState("");
  // const [region, setRegion] = useState("");

  function handleDistributorsLocation(distributors: DistributorProps[]) {
    const locations: (GeoProps | null)[] = distributors.map((distributor) => {
      if (!distributor.latitude || !distributor.longitude) {
        return null;
      }
      const { latitude, longitude, id: distributorId } = distributor;
      return { lat: latitude, lng: longitude, distributorId };
    });

    const validLocations: GeoProps[] = locations.filter(
      (location): location is GeoProps => location !== null
    );

    setDistributorsGeolocation(validLocations);
  }

  function geoDistributorsLocation() {
    return distributorsGeolocation;
  }

  return (
    <LocationContext.Provider
      value={{
        geoDistributorsLocation,
        handleDistributorsLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
