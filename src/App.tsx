import { SelectInput } from "./components/ui/select";
import { InputMask } from "./components/ui/input-mask";
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

function App() {
  const [distributors, setDistributors] = useState<DistributorProps[]>([]);
  const [distributorsLocations, setDistributorsLocations] = useState<
    GeoProps[]
  >([]);

  const [search, setSearch] = useURLState(
    "q",
    "",
    encodeURIComponent,
    decodeURIComponent
  );
  const [region, setRegion] = useURLState(
    "region",
    "",
    encodeURIComponent,
    decodeURIComponent
  );
  const [cep, setCep] = useURLState(
    "cep",
    "",
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

  console.log("Região: ", region);
  console.log("CEP: ", cep);
  console.log("Busca: ", search);
  console.log("Centro do mapa: ", mapCenter);
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

  const handlePlaceSelected = (place: PlaceProps) => {
    setMapCenter({
      lat: place.location.latitude,
      lng: place.location.longitude,
    });
    setSearch(place.displayName.text);
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
      setDistributors(response.data);
      handleDistributorsLocation(response.data);
    } catch (error) {
      console.error("Erro ao buscar distribuidores:", error);
    }
  }, [handleDistributorsLocation]);

  useEffect(() => {
    fetchDistributors();
  }, [fetchDistributors]);

  return (
    <div className="flex h-screen flex-col items-center gap-4">
      <div className="relative h-[400px] justify-center bg-gray-300">
        <img
          src={bannerMobile}
          alt="banner"
          className="z-0 min-h-full w-[100vw] min-w-full bg-cover bg-no-repeat object-cover [@media(min-width:640px)]:hidden" // Exibe até 485px
        />
        <img
          src={bannerWeb}
          alt="banner"
          className="z-0 hidden min-h-full w-[100vw] min-w-full bg-cover bg-no-repeat object-cover [@media(min-width:640px)]:block" // Exibe a partir de 485px
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
        </div>

        <Tabs.Root>
          <Tabs.Container defaultValue="list">
            <Tabs.Options>
              <Tabs.Option
                icon={<List />}
                title="Exibição de lista"
                value="list"
              />
              <Tabs.Option icon={<Local />} title="Visão do mapa" value="map" />
            </Tabs.Options>

            <Tabs.Content value="list">
              <section className="flex flex-wrap justify-center gap-6 self-stretch">
                {distributors.map((distributor: DistributorProps) => (
                  <Card
                    key={distributor.DISTRIBUTOR_ID}
                    plan="pro"
                    title={distributor.FIRST_NAME}
                    name={`${distributor.FIRST_NAME} ${distributor.LAST_NAME}`}
                    address={distributor.ADDRESS}
                    phone={distributor.PHONE_NUMBER?.replace(
                      /(\d{2})(\d{4,5})(\d{4})/,
                      "($1) $2-$3"
                    )}
                    whatsapp={distributor.WHATSAPP_NUMBER.replace(
                      /(\d{2})(\d{4,5})(\d{4})/,
                      "($1) $2-$3"
                    )}
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
                  key={mapCenter.lat}
                />
              </section>
            </Tabs.Content>
          </Tabs.Container>
        </Tabs.Root>

        <Footer />
      </div>
    </div>
  );
}

export default App;
