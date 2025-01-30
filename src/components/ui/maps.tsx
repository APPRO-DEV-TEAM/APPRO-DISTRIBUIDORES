import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Loading } from "./loading";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export function Maps() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyATFFlBVvbstEAytcAChHNX73TIrsFmGzU",
  });

  return (
    <div id="map" className="w-full sm:w-[80vw]">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        ></GoogleMap>
      ) : (
        <Loading />
      )}
    </div>
  );
}
