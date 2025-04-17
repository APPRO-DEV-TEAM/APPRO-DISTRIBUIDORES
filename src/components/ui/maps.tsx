import { GeoProps } from "@/types/geo.types";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { Circle } from '../maps/circle';
import { MailsIcon, Phone } from "lucide-react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Whatsapp = () => <FontAwesomeIcon icon={faWhatsapp} />;

type MapsProps = {
  locations: GeoProps[]; // Use o tipo GeoProps diretamente
  mapCenter?: { lat: number; lng: number };
  rangeZone?: number;
  zoom?: number;
};

import glyph from "@/assets/pin.png";
import { useEffect, useState } from "react";
import { Modal } from "./modal";
import { api } from "@/services/api";
import { AppError } from "@/utils/AppError";
import { DistributorProps } from "@/types/distributors.types";
import { LabelPlan } from "./card";
import { Loading } from "./loading";

export function Maps({ locations, mapCenter, rangeZone, zoom = 8 }: MapsProps) {
  const [radius, setRadius] = useState(0);
  const [mapZoom, setMapZoom] = useState(zoom);

  useEffect(() => {
    setMapZoom(zoom)
    setRadius(Number(rangeZone) * 1000 || 0);
  }, [rangeZone, zoom]);

  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [distribuidor, setDistributor] = useState<DistributorProps | null>(null);


  function handleSelectMarker(id: string) {
    if (selectedMarker === id) {
      setSelectedMarker(null);
      setDistributor(null)
    } else {
      setSelectedMarker(id);
      fetchDistributorDetails(id);
    }
  }

  async function fetchDistributorDetails(id: string) {
    try {
      const response = await api.get<DistributorProps>(`/distributors/${id}`);
      setDistributor(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : 'Erro ao buscar detalhes do distribuidor';
      if (isAppError) {
        console.error(message);
      }
    }
  }

  return (
    <div id="map" className="w-full overflow-hidden rounded-2xl sm:w-[80vw]">
      <Modal.Root isOpen={selectedMarker !== null} onClose={() => { setSelectedMarker(null); setDistributor(null) }}>
        <Modal.Content className="flex-1 items-center justify-center">
          {distribuidor ?
            <section className="flex-col p-4">
              {/* Seção do Plano */}
              <LabelPlan plan={distribuidor.PLAN_TYPE!} />

              {/* Conteúdo Principal */}
              <div className="flex w-full flex-col gap-4 lg:items-start lg:justify-start">
                {/* Título */}
                <h1 className="text-center text-2xl font-bold">
                  {distribuidor.FIRST_NAME}
                </h1>

                {/* Dados de usuário */}
                <div className="flex flex-col items-center gap-2 lg:items-start lg:justify-start lg:text-start">
                  <div className="image-wrapper mb-2 h-16 w-16 overflow-hidden rounded-full bg-zinc-400">
                    <img src={distribuidor.AVATAR ? distribuidor.AVATAR : '/avatar_fallback.png'} />
                  </div>
                  <p className="text-center text-lg font-semibold">{distribuidor.FIRST_NAME} {distribuidor.LAST_NAME}</p>
                  <p className="text-center text-md text-gray-500 lg:text-start">
                    {distribuidor.ADDRESS}
                  </p>
                </div>

                {/* Informações de contato */}
                <div className="flex flex-col items-center justify-center gap-4 lg:items-start lg:justify-start">
                  <a href={`https://wa.me/${distribuidor.WHATSAPP_NUMBER}`} className="flex items-center gap-2">
                    <Whatsapp />
                    <span className="text-md text-gray-700">{distribuidor.WHATSAPP_NUMBER}</span>
                  </a>
                  <a href={`tel:+${distribuidor.PHONE_NUMBER}`} className="flex items-center gap-2">
                    <Phone size={14} />
                    <span className="text-md text-gray-700">{distribuidor.PHONE_NUMBER}</span>
                  </a>
                  <a href={`mailto:${distribuidor.EMAIL}`} className="flex items-center gap-2">
                    <MailsIcon size={14} />
                    <p className="text-md text-gray-700 truncate overflow-hidden">{distribuidor.EMAIL}</p>
                  </a>
                </div>
              </div>
            </section>
            :
            <Loading />}

        </Modal.Content>
      </Modal.Root>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          mapId="fee4406f23c81cde"
          defaultCenter={
            mapCenter?.lat !== 0 && mapCenter?.lng !== 0
              ? mapCenter
              : { lat: locations[0].lat, lng: locations[0].lng }
          }
          onZoomChanged={(zoom) => setMapZoom(zoom.detail.zoom)}
          zoom={mapZoom}
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
