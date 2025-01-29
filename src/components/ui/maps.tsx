import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useState, useEffect } from "react";
import { Loading } from "./loading";

export function Maps() {
  // Estado para armazenar a localização atual
  const [currentLocation, setCurrentLocation] = useState<
    [number, number] | null
  >(null);

  useEffect(() => {
    // Obter a localização atual do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Atualiza a localização com as coordenadas obtidas
          setCurrentLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Erro ao obter a localização", error);
          // Caso não consiga obter a localização, define um valor padrão
          setCurrentLocation([51.505, -0.09]); // Localização padrão
        }
      );
    } else {
      console.error("Geolocalização não suportada");
      // Caso o navegador não suporte geolocalização, usa uma localização padrão
      setCurrentLocation([51.505, -0.09]); // Localização padrão
    }
  }, []);

  // Se a localização ainda não foi carregada, exibe uma mensagem de carregamento
  if (currentLocation === null) {
    return <Loading />;
  }

  return (
    <div id="map" className="h-[500px]">
      <MapContainer center={currentLocation} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" />'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={currentLocation}></Marker>
      </MapContainer>
    </div>
  );
}
