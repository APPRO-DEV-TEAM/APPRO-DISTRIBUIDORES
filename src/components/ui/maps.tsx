import { GeoProps } from "@/types/geo.types";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { Circle } from '../maps/circle';

type MapsProps = {
  locations: GeoProps[]; // Use o tipo GeoProps diretamente
  mapCenter?: { lat: number; lng: number };
  rangeZone?: number;
  zoom?: number;
};

import glyph from "@/assets/pin.png";
import { useEffect, useState } from "react";

export function Maps({ locations, mapCenter, rangeZone, zoom = 8 }: MapsProps) {
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    setRadius(Number(rangeZone) * 1000 || 0);
  }, [rangeZone]);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);


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
          defaultZoom={zoom}
          style={{ width: "100%", height: "500px" }}
        >
          {radius > 0 &&
            <Circle
              strokeWeight={1}
              strokeColor={"oklch(0.707 0.165 254.624)"}
              fillColor={"#1447e6"}
              center={mapCenter}
              radius={radius}
            />
          }
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

        </Map>
      </APIProvider>
    </div>
  );
}
