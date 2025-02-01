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
import { PredictionsResultsProps } from "./components/ui/search/search.types";
import { Search } from "./components/ui/search";

import { useForm, Controller, FieldValues } from "react-hook-form";

import { useSyncLocations } from "./hooks/use-sync-locations";
import { useLocationContext } from "./contexts/location-context";

function App() {
  const { control, handleSubmit } = useForm();
  const { geoDistributorsLocation } = useLocationContext();

  useSyncLocations();
  const handleResults = (data: PredictionsResultsProps) => {
    console.log("Resultados atualizados:", data.places);
  };

  const handleSubmitSearch = (data: FieldValues) => {
    console.log("Buscando por:", data);
  };

  return (
    <div className="flex h-screen flex-col items-center gap-4">
      <div className="relative h-[400px] w-full justify-center bg-gray-300">
        <img
          src={bannerMobile}
          alt="banner"
          className="z-0 min-h-full w-[100vw] object-cover [@media(min-width:485px)]:hidden" // Exibe até 485px
        />
        <img
          src={bannerWeb}
          alt="banner"
          className="z-0 hidden min-h-full w-[100vw] object-cover [@media(min-width:485px)]:block" // Exibe a partir de 485px
        />
      </div>

      <div className="z-10 flex w-[90vw] items-center justify-center sm:w-[80vw]">
        <div className="mt-[50px] flex w-full flex-col items-center justify-center gap-6 rounded-2xl bg-zinc-800 px-8 py-6 sm:mt-[-50px] sm:px-16 sm:py-8 md:mt-[-60px] md:px-10 md:py-10 lg:mt-[30px]">
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
                  onSearch={(value: string) =>
                    handleSubmit((data) =>
                      handleSubmitSearch({ ...data, search: value })
                    )()
                  }
                />
                <Search.List>
                  <Search.Item
                    renderItem={(place) => (
                      <div
                        key={place.id}
                        className="cursor-pointer p-3 hover:bg-gray-50"
                      >
                        <p className="font-medium text-gray-800">
                          {place.displayName.text}{" "}
                        </p>
                        <p className="text-sm text-gray-600">
                          {place.formattedAddress}
                        </p>
                      </div>
                    )}
                  />
                </Search.List>
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
                onChange={field.onChange}
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
            name="state"
            render={({ field }) => <InputMask onChange={field.onChange} />}
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
              <section className="flex flex-wrap justify-center gap-4 self-stretch">
                <Card
                  title="São Paulo - Zona Sul"
                  name="Ricardo Carvalho"
                  address="14020-750 - Brasil"
                  phone="(21) 99264-5278"
                  whatsapp="(21) 99264-5278"
                  email="contato@distribuidor.com.br"
                />
                <Card
                  title="São Paulo - Zona Sul"
                  name="Ricardo Carvalho"
                  address="14020-750 - Brasil"
                  phone="(21) 99264-5278"
                  whatsapp="(21) 99264-5278"
                  email="contato@distribuidor.com.br"
                />
                <Card
                  title="São Paulo - Zona Sul"
                  name="Ricardo Carvalho"
                  address="14020-750 - Brasil"
                  phone="(21) 99264-5278"
                  whatsapp="(21) 99264-5278"
                  email="contato@distribuidor.com.br"
                />
                <Card
                  title="São Paulo - Zona Sul"
                  name="Ricardo Carvalho"
                  address="14020-750 - Brasil"
                  phone="(21) 99264-5278"
                  whatsapp="(21) 99264-5278"
                  email="contato@distribuidor.com.br"
                />
                <Card
                  title="São Paulo - Zona Sul"
                  name="Ricardo Carvalho"
                  address="14020-750 - Brasil"
                  phone="(21) 99264-5278"
                  whatsapp="(21) 99264-5278"
                  email="contato@distribuidor.com.br"
                />
                <Card
                  title="São Paulo - Zona Sul"
                  name="Ricardo Carvalho"
                  address="14020-750 - Brasil"
                  phone="(21) 99264-5278"
                  whatsapp="(21) 99264-5278"
                  email="contato@distribuidor.com.br"
                />
              </section>
            </Tabs.Content>
            <Tabs.Content value="map">
              <section className="flex justify-center">
                <Maps locations={geoDistributorsLocation} />
              </section>
            </Tabs.Content>
          </Tabs.Container>
        </Tabs.Root>
      </div>
    </div>
  );
}

export default App;
