import { GeoProps } from "@/types/geo.types";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

type MapsProps = {
  locations: GeoProps[]; // Use o tipo GeoProps diretamente
  mapCenter?: { lat: number; lng: number };
};

export function Maps({ locations, mapCenter }: MapsProps) {
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
          center={
            mapCenter?.lat !== 0 && mapCenter?.lng !== 0
              ? mapCenter
              : { lat: locations[0].lat, lng: locations[0].lng }
          }
          defaultZoom={30}
          style={{
            width: "100%",
            height: "500px",
          }}
        >
          {locations.map((location) => (
            <AdvancedMarker
              key={location.distributorId}
              position={{ lat: location.lat, lng: location.lng }}
            >
              <Pin borderColor="#000" glyphColor="#000" />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
