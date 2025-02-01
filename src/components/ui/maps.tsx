import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useLocate } from "../../hooks/use-locate";

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
      <APIProvider apiKey="AIzaSyCayBJlSt4XIOk3ec0WuTHJpm3P_-MOgmg">
        <Map
          defaultCenter={center}
          defaultZoom={12}
          style={{
            width: "100%",
            height: "500px",
          }}
        >
          {geo ? (
            geo.map((location) => (
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
            ))
          ) : (
            <p>Carregando distribuidores...</p>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}
