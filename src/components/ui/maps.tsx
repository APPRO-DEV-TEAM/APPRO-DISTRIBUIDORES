import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { useLocate } from "../../hooks/use-locate";
import { LocationProvider } from "../../contexts/location-context";

const center = {
  lat: -3.745,
  lng: -38.523,
};

export function Maps() {
  const { geoDistributorsLocation } = useLocate(); // Evita erro ao acessar um valor undefined

  const geo = geoDistributorsLocation();
  console.log(geo);
  return (
    <div id="map" className="w-full overflow-hidden rounded-2xl sm:w-[80vw]">
      <LocationProvider>
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
            {geo ? (
              geo.map((location) => (
                <AdvancedMarker
                  key={location.distributorId}
                  position={{ lat: location.lat, lng: location.lng }}
                >
                  <Pin borderColor="#000" glyphColor="#000" />
                </AdvancedMarker>
              ))
            ) : (
              <p>Carregando distribuidores...</p>
            )}
          </Map>
        </APIProvider>
      </LocationProvider>
    </div>
  );
}
