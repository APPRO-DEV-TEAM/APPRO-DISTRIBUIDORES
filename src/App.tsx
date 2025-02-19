import { Card } from "./components/ui/card";
import { Tabs } from "./components/ui/tabs";
import { Maps } from "./components/ui/maps";

import { SearchIcon } from "lucide-react";

import { Local } from "./assets/icons/local";
import { List } from "./assets/icons/list";

import bannerWeb from "./assets/banner-web.png";
import bannerMobile from "./assets/banner-mobile.png";
import { PlaceProps, PredictionsResultsProps } from "./types/search.types";
import { Search } from "./components/ui/search";

import { useForm, Controller, FieldValues } from "react-hook-form";

import { useURLState } from "./hooks/use-url-state";
import { useSearch } from "./hooks/use-search";
import { DistributorProps } from "./types/distributors.types";
import { useCallback, useEffect, useState } from "react";
import { api } from "./services/api";
import { GeoProps } from "./types/geo.types";
import { Footer } from "./components/ui/footer";
import { SelectInput } from "./components/ui/select";

export type Address = {
  road?: string;
  quarter?: string;
  neighbourhood?: string;
  suburb?: string;
  city_district?: string;
  city?: string;
  municipality?: string;
  county?: string;
  state_district?: string;
  state?: string;
  ISO3166_2_lvl4?: string;
  region?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
};

export type GeoLocation = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
  boundingbox: [string, string, string, string];
};
function App() {
  const [distributors, setDistributors] = useState<DistributorProps[]>([]);
  const [mapZoom, setMapZoom] = useState<number>();
  const [distributorsLocations, setDistributorsLocations] = useState<
    GeoProps[]
  >([]);

  const [search, setSearch] = useURLState(
    "q",
    "",
    encodeURIComponent,
    decodeURIComponent
  );
  const [rangeZone, setRegion] = useURLState(
    "zone",
    "25",
    encodeURIComponent,
    decodeURIComponent
  );
  const [mapCenter, setMapCenter] = useURLState(
    "map", // Chave que será usada na URL
    { lat: 0, lng: 0 }, // Valor inicial
    (state) => `${state.lat},${state.lng}`, // Serializa para "lat,lng"
    (state) => {
      const [lat, lng] = state.split(",").map((coord) => parseFloat(coord));
      return { lat, lng }; // Desserializa de volta para objeto
    }
  );

  const { control, handleSubmit } = useForm();

  const { loadPredictions, predictionResults, setPredictionResults } =
    useSearch();

  // console.log("Região: ", region);
  // console.log("CEP: ", cep);
  console.log("RangeZone atualizado:", rangeZone);
  console.log("Busca: ", search);
  console.log("Centro do mapa: ", mapCenter);
  console.log("Zoom do mapa: ", mapZoom);
  console.log("Distribuidores: ", distributors);
  console.log("Localizações dos distribuidores: ", distributorsLocations);
  console.log("Autocomplete: ", predictionResults);
  console.log("--------------------------------------------------");


  const handleResults = (data: PredictionsResultsProps) => {
    console.log("Resultados atualizados:", data.places);
  };

  const handleSubmitSearch = (data: FieldValues) => {
    console.log("Buscando por:", data);
  };

  async function getAddressFromCoords(lat: number, lng: number): Promise<GeoLocation | null> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // Se o usuário negar a permissão, define um local padrão (ex: São Paulo)
          setMapCenter({ lat: -23.55052, lng: -46.633308 });
        }
      );
    } else {
      // Caso o navegador não suporte geolocalização
      setMapCenter({ lat: -23.55052, lng: -46.633308 });
    }
    const fetchAddress = async () => {
      if (mapCenter.lat === 0 && mapCenter.lng === 0) return;
      const geo = await getAddressFromCoords(mapCenter.lat, mapCenter.lng);
      setSearch(geo?.address.municipality || "");
    }
    fetchAddress()
    // eslint-disable-next-line
  }, []);

  const filterDistributorsByRange = useCallback(
    (distributors: DistributorProps[], coordinates: { latitude: number, longitude: number }, maxDistanceKm: number) => {
      const toRadians = (degree: number) => (degree * Math.PI) / 180;
      const EARTH_RADIUS_KM = 6371; // Raio da Terra em km

      return distributors.filter((distributor) => {
        const latitudeDifference = toRadians(distributor.LATITUDE - coordinates.latitude);
        const longitudeDifference = toRadians(distributor.LONGITUDE - coordinates.longitude);

        const targetLatitudeInRadians = toRadians(coordinates.latitude);
        const distributorLatitudeInRadians = toRadians(distributor.LATITUDE);

        const haversineFormula = Math.sin(latitudeDifference / 2) ** 2 +
          Math.sin(longitudeDifference / 2) ** 2 * Math.cos(targetLatitudeInRadians) * Math.cos(distributorLatitudeInRadians);
        const centralAngle = 2 * Math.atan2(Math.sqrt(haversineFormula), Math.sqrt(1 - haversineFormula));

        const distanceBetweenPoints = EARTH_RADIUS_KM * centralAngle; // Distância em km

        return distanceBetweenPoints <= maxDistanceKm;
      });
    },
    []
  );

  const handlePlaceSelected = (place: PlaceProps) => {
    const zoomLevel = Math.max(3, 15 - Math.log2(Number(rangeZone)));
    setMapCenter({
      lat: place.location.latitude,
      lng: place.location.longitude,
    });
    setSearch(place.displayName.text);
    setMapZoom(zoomLevel)
    setPredictionResults([]);
  };

  const handleDistributorsLocation = useCallback(
    (distributors: DistributorProps[]) => {
      const newLocations = distributors.map((distributor) => ({
        lat: distributor.LATITUDE,
        lng: distributor.LONGITUDE,
        distributorId: distributor.DISTRIBUTOR_ID.toString(),
      }));
      setDistributorsLocations(newLocations);
    },
    []
  );

  const fetchDistributors = useCallback(async () => {
    try {
      const response = await api.get<DistributorProps[]>("/distributors");
      setDistributors(filterDistributorsByRange(response.data, { latitude: mapCenter.lat, longitude: mapCenter.lng }, parseInt(rangeZone)));
      handleDistributorsLocation(response.data);
    } catch (error) {
      console.error("Erro ao buscar distribuidores:", error);
    }
  }, [filterDistributorsByRange, handleDistributorsLocation, mapCenter, rangeZone]);

  useEffect(() => {
    fetchDistributors();
  }, [fetchDistributors]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-[400px] w-min-[100vw] justify-center bg-gray-300">
        <img
          src={bannerMobile}
          alt="banner"
          className="z-0 min-h-full w-[100vw] min-w-full bg-cover bg-no-repeat object-cover [@media(min-width:470px)]:hidden" // Exibe até 485px
        />
        <img
          src={bannerWeb}
          alt="banner"
          className="z-0 hidden min-h-full w-[100vw] min-w-full bg-cover bg-no-repeat object-cover [@media(min-width:470px)]:block" // Exibe a partir de 485px
        />
      </div>

      <div className="z-10 flex w-[90vw] items-center justify-center sm:w-[80vw]">
        <div className="mt-[40px] flex w-full flex-col items-center justify-center gap-6 rounded-2xl bg-zinc-800 px-8 py-6 sm:mt-[-50px] sm:px-16 sm:py-8 md:mt-[-20px] md:px-10 md:py-10 lg:mt-[0px]">
          <span className="text-center text-base font-light text-white sm:text-lg md:text-xl lg:text-start lg:text-[38px]">
            Encontre o{" "}
            <span className="font-dmSans bg-gradient-to-r from-[#ffe1b7] via-[#fff0d7] to-[#a79172] bg-clip-text font-medium text-transparent">
              Distribuidor APPRO
            </span>{" "}
            Mais Próximo de Você
          </span>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <div className="h-full w-full flex-1">
              <Search.Root onResultChange={handleResults}>
                <Search.Input
                  icon={SearchIcon}
                  value={search}
                  onChange={(text: string) => {
                    setSearch(text);
                    loadPredictions(text);
                  }}
                  onSearch={(value: string) =>
                    handleSubmit((data) => {
                      handleSubmitSearch({ ...data, search: value });
                    })()
                  }
                />
                <Search.List
                  predictions={predictionResults}
                  isOpen={true}
                  renderItem={(place: PlaceProps) => (
                    <div className="flex flex-col gap-2">
                      <button
                        key={place.id}
                        className="flex-1 cursor-pointer flex-col p-3 hover:bg-gray-50"
                        onClick={() => {
                          handlePlaceSelected(place);
                        }}
                      >
                        <p className="text-start font-medium text-gray-800">
                          {place.displayName.text}{" "}
                        </p>
                        <p className="text-start text-sm text-gray-600">
                          {place.formattedAddress}
                        </p>
                      </button>
                    </div>
                  )}
                />
              </Search.Root>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full w-[90vw] flex-col gap-6 sm:w-[80vw]">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <Controller
            control={control}
            name="rangeZone"
            render={({ field }) => (
              <SelectInput
                placeholder="Distância"
                value={rangeZone}
                onChange={(value) => {
                  setRegion(value);
                  field.onChange(value);
                }}
                options={[
                  { id: "1", value: "2", label: "2km" },
                  { id: "2", value: "5", label: "5km" },
                  { id: "3", value: "10", label: "10km" },
                  { id: "4", value: "25", label: "25km" },
                  { id: "5", value: "50", label: "50km" },
                  { id: "6", value: "80", label: "80km" },
                  { id: "7", value: "100", label: "100km" },
                  { id: "8", value: "200", label: "200km" },
                ]}
              />
            )}
          />
        </div>

        {/* Options */}
        {/* <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <Controller
            control={control}
            name="region"
            render={({ field }) => (
              <SelectInput
                placeholder="Região"
                value={region}
                onChange={(value) => {
                  setRegion(value);
                  field.onChange(value);
                }}
                options={[
                  { id: "1", value: "norte", label: "Norte" },
                  { id: "2", value: "nordeste", label: "Nordeste" },
                  { id: "3", value: "centrooeste", label: "Centro-Oeste" },
                  { id: "4", value: "sudeste", label: "Sudeste" },
                  { id: "5", value: "sul", label: "Sul" },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="cep"
            render={({ field }) => (
              <InputMask
                onChange={(value) => {
                  setCep(value);
                  field.onChange(value);
                }}
              />
            )}
          />
        </div> */}

        <Tabs.Root>
          <Tabs.Container defaultValue="list">
            <Tabs.Options>
              <Tabs.Option
                icon={<List />}
                title="Lista"
                value="list"
              />
              <Tabs.Option icon={<Local />} title="Mapa" value="map" />
            </Tabs.Options>

            <Tabs.Content value="list">
              <section className="flex flex-wrap justify-center gap-6 self-stretch">
                {distributors.map((distributor: DistributorProps) => (
                  <Card
                    key={distributor.DISTRIBUTOR_ID}
                    plan={distributor.PLAN_TYPE}
                    title={distributor.FIRST_NAME}
                    name={`${distributor.FIRST_NAME} ${distributor.LAST_NAME}`}
                    address={distributor.ADDRESS}
                    phone={distributor.PHONE_NUMBER}
                    whatsapp={distributor.WHATSAPP_NUMBER}
                    email={distributor.EMAIL}
                  />
                ))}
              </section>
            </Tabs.Content>
            <Tabs.Content value="map">
              <section className="flex justify-center">
                <Maps
                  locations={distributorsLocations}
                  mapCenter={mapCenter}
                  zoom={mapZoom || 8}
                  rangeZone={parseInt(rangeZone)}
                  key={mapCenter.lat}
                />
              </section>
            </Tabs.Content>
          </Tabs.Container>
        </Tabs.Root>

      </div>
      <Footer />
    </div>
  );
}

export default App;
