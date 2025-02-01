import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useSearch } from "../../hooks/use-search";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export function Maps() {
  const { geo } = useSearch();

  return (
    <div id="map" className="w-full sm:w-[80vw]">
      <APIProvider apiKey="AIzaSyATFFlBVvbstEAytcAChHNX73TIrsFmGzU">
        <Map defaultCenter={center} defaultZoom={12} style={containerStyle}>
          {geo.map((location) => {
            return (
              <AdvancedMarker
                key={location.distributorId}
                position={{ lat: location.lat, lng: location.lng }}
              >
                <div className="rounded-lg bg-white p-2 shadow-lg">
                  <h2 className="text-lg font-bold">Distribuidor</h2>
                  <p>Latitude: {location.lat}</p>
                  <p>Longitude: {location.lng}</p>
                </div>
              </AdvancedMarker>
            );
          })}
        </Map>
      </APIProvider>
    </div>
  );
}
