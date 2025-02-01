"use client";
import { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";

// import { Input } from "./components/ui/input";
import { SelectInput } from "./components/ui/select";
import { InputMask } from "./components/ui/input-mask";
import { Card } from "./components/ui/card";
import { Tabs } from "./components/ui/tabs";
import { Maps } from "./components/ui/maps";
import { Search } from "./components/ui/search";
import { Footer } from "./components/ui/footer";

import { Local } from "./assets/icons/local";
import { List } from "./assets/icons/list";

import bannerWeb from "./assets/banner-web.png";
import bannerMobile from "./assets/banner-mobile.png";

import { SearchIcon } from "lucide-react";

import { PlaceProps } from "./components/ui/search/search.types";
import { MaskNumber } from "./utils/Mask";

import { DistributorProps } from "./types/distributors.types";
import { useLocate } from "./hooks/use-locate";

import { api } from "./services/api";
import { useDistributors } from "./hooks/use-distributors";
import { Control } from "leaflet";

export interface PlacesProps {
  places: PlaceProps[];
}

const REGIONS = [
  { id: "1", value: "norte", label: "Norte" },
  { id: "2", value: "nordeste", label: "Nordeste" },
  { id: "3", value: "centrooeste", label: "Centro-Oeste" },
  { id: "4", value: "sudeste", label: "Sudeste" },
  { id: "5", value: "sul", label: "Sul" },
];

function App() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      region: "norte",
      cep: "",
      location: null,
    },
  });
  // const [region, setRegion] = useState<string>();
  // const [cep, setCep] = useState<string>();
  // const [selectedLocation, setSelectedLocation] = useState<PlaceProps | null>(
  //   null
  // );

  const { distributors, loadDistributors } = useDistributors();

  console.log("App rendered");

  useEffect(() => {
    console.log("Efeito de carregamento de distribuidores disparado");
    loadDistributors();
  }, [loadDistributors]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-[400px] w-full justify-center bg-gray-300">
        <img
          src={bannerMobile}
          alt="banner"
          className="z-0 min-h-full w-[100vw] object-cover [@media(min-width:485px)]:hidden" // Exibe até 485px
        />
        <img
          src={bannerWeb}
          alt="banner"
          className="z-0 hidden min-h-full object-cover [@media(min-width:485px)]:block" // Exibe a partir de 485px
        />
      </div>

      <div className="z-10 flex w-[90vw] items-center justify-center sm:w-[80vw]">
        <div className="mt-[50px] flex w-full flex-col items-center justify-center gap-6 rounded-2xl bg-zinc-800 px-8 py-6 sm:px-16 sm:py-8 md:px-10 md:py-10">
          <span className="text-center text-base font-light text-white sm:text-lg md:text-xl lg:text-start lg:text-[38px]">
            Encontre o{" "}
            <span className="font-dmSans bg-gradient-to-r from-[#ffe1b7] via-[#fff0d7] to-[#a79172] bg-clip-text font-medium text-transparent">
              Distribuidor APPRO
            </span>{" "}
            Mais Próximo de Você
          </span>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <div className="h-full w-full flex-1">
              <Search.Root>
                <Search.Input icon={SearchIcon} />
                <Search.List>
                  <Search.Item
                    renderItem={(place) => (
                      <Controller
                        name="location"
                        control={control}
                        render={({ field }) => (
                      <div className="flex flex-col items-start gap-2">
                        <button
                          key={Math.random()}
                          className="w-full cursor-pointer items-start justify-start p-3 hover:bg-gray-50"
                          onClick={() => handleSelectLocation(place)}
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
                      
                    )}
                  />
                </Search.List>
              </Search.Root>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-full w-[90vw] flex-1 flex-col gap-6 overflow-y-visible sm:w-[80vw]">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <SelectInput
                placeholder="Região"
                onChange={field.onChange}
                options={REGIONS}
              />
            )}
          />

          <Controller
            name="cep"
            control={control}
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
                {distributors.map((distributor: DistributorProps) => {
                  return (
                    <Card
                      title={distributor.region}
                      name={
                        distributor.contactFirstName +
                        " " +
                        distributor.contactLastName
                      }
                      address={distributor.address}
                      phone={
                        distributor.phoneNumber
                          ? MaskNumber().mask(distributor.phoneNumber)
                          : ""
                      }
                      whatsapp={MaskNumber().mask(distributor.whatsappNumber)}
                      email={distributor.contactEmail}
                    />
                  );
                })}
              </section>
            </Tabs.Content>
            <Tabs.Content value="map">
              <section className="flex justify-center">
                <Maps />
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
