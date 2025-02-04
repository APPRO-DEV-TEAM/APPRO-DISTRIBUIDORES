import { GeoProps } from "@/types/geo.types";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";

type MapsProps = {
  locations: GeoProps[]; // Use o tipo GeoProps diretamente
  mapCenter?: { lat: number; lng: number };
};

import glyph from "@/assets/pin.png";
import { useEffect, useState } from "react";
import { Card } from "./card";

import { api } from "@/services/api";
import { DistributorProps } from "@/types/distributors.types";

export function Maps({ locations, mapCenter }: MapsProps) {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [selectedDistributor, setSelectedDistributor] =
    useState<DistributorProps | null>(null);

  useEffect(() => {
    if (selectedMarker) {
      async function fetchDistributor() {
        try {
          const response = await api.get<DistributorProps>(
            `/distributors/${selectedMarker}`
          );
          setSelectedDistributor(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      fetchDistributor();
    } else {
      setSelectedDistributor(null);
    }
  }, [selectedMarker]);

  function handleSelectMarker(id: string) {
    if (selectedMarker === id) {
      setSelectedMarker(null);
    } else {
      setSelectedMarker(id);
    }
  }
  return (
    <div id="map" className="w-full overflow-hidden rounded-2xl sm:w-[80vw]">
      <APIProvider apiKey="AIzaSyCayBJlSt4XIOk3ec0WuTHJpm3P_-MOgmg">
        <Map
          mapId="fee4406f23c81cde"
          defaultCenter={
            mapCenter?.lat !== 0 && mapCenter?.lng !== 0
              ? mapCenter
              : { lat: locations[0].lat, lng: locations[0].lng }
          }
          defaultZoom={mapCenter ? 17 : 13}
          style={{ width: "100%", height: "500px" }}
        >
          {locations.map((location) => (
            <AdvancedMarker
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => handleSelectMarker(location.distributorId)}
              key={location.distributorId}
            >
              {/* Ícone do marcador */}
              <img src={glyph} alt="Marker Personalizado" className="h-8 w-8" />
            </AdvancedMarker>
          ))}

          {/* Renderize os Cards fora dos marcadores */}
          {locations.map(
            (location) =>
              selectedMarker === location.distributorId && (
                <AdvancedMarker
                  position={{ lat: location.lat, lng: location.lng }}
                  key={`card-${location.distributorId}`}
                >
                  <div
                    className="pointer-events-auto translate-y-[50px] scale-70 rounded-lg bg-transparent p-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-2 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-zinc-700 text-white"
                      onClick={() => setSelectedMarker(null)}
                    >
                      ✕
                    </button>
                    {selectedDistributor && (
                      <Card
                        plan="starter"
                        title="Distribuidor"
                        name={`${selectedDistributor.FIRST_NAME} ${selectedDistributor.LAST_NAME}`}
                        address={selectedDistributor.ADDRESS}
                        phone={selectedDistributor.PHONE_NUMBER}
                        whatsapp={selectedDistributor.WHATSAPP_NUMBER}
                        email={selectedDistributor.EMAIL}
                      />
                    )}
                  </div>
                </AdvancedMarker>
              )
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
