import { GeoProps } from "@/types/geo.types";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";

type MapsProps = {
  locations: GeoProps[]; // Use o tipo GeoProps diretamente
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export function Maps({ locations }: MapsProps) {
  return (
    <div id="map" className="w-full overflow-hidden rounded-2xl sm:w-[80vw]">
      <APIProvider apiKey="AIzaSyCayBJlSt4XIOk3ec0WuTHJpm3P_-MOgmg">
        <Map
          defaultCenter={center}
          defaultZoom={12}
          style={{
            width: "100%",
            height: "500px",
          }}
          mapId="fee4406f23c81cde"
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
