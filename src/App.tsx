import { useState } from "react";

import { Input } from "./components/ui/input";
import { SelectInput } from "./components/ui/select";
import { InputMask } from "./components/ui/input-mask";
import { Card } from "./components/ui/card";
import { Tabs } from "./components/ui/tabs";
import { Maps } from "./components/ui/maps";

import { Search } from "lucide-react";

import { Local } from "./assets/icons/local";
import { List } from "./assets/icons/list";

import bannerWeb from "./assets/banner-web.png";
import bannerMobile from "./assets/banner-mobile.png";

function App() {
  const [value, setValue] = useState("");
  const [cep, setCep] = useState("");

  console.log(value, cep);
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
          <Input placeholder="Procurar" icon={Search} />
        </div>
      </div>

      <div className="flex h-full w-[90vw] flex-col gap-6 sm:w-[80vw]">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <SelectInput
            placeholder="Região"
            onChange={setValue}
            options={[
              { id: "1", value: "norte", label: "Norte" },
              { id: "2", value: "nordeste", label: "Nordeste" },
              { id: "3", value: "centrooeste", label: "Centro-Oeste" },
              { id: "4", value: "sudeste", label: "Sudeste" },
              { id: "5", value: "sul", label: "Sul" },
            ]}
          />
          <InputMask onChange={setCep} />
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
                <Maps />
              </section>
            </Tabs.Content>
          </Tabs.Container>
        </Tabs.Root>
      </div>
    </div>
  );
}

export default App;
