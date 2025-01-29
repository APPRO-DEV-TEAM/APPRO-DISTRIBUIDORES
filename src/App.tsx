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

function App() {
  const [value, setValue] = useState("");
  const [cep, setCep] = useState("");

  console.log(value, cep);
  return (
    <div className="flex h-screen flex-col items-center gap-4">
      <div className="relative h-[635px] w-full bg-gray-300">
        <img
          src={bannerWeb}
          alt="banner"
          className="z-0 min-h-full object-cover"
        />
      </div>

      <div className="z-10 flex w-[80%] items-center justify-center">
        <div className="mt-[-100px] flex w-full flex-col items-center justify-center gap-6 rounded-2xl bg-zinc-800 px-16 py-8">
          <span className="text-[2vw] font-light text-white">
            Encontre o{" "}
            <span className="font-dmSans bg-gradient-to-r from-[#ffe1b7] via-[#fff0d7] to-[#a79172] bg-clip-text font-medium text-transparent">
              Distribuidor APPRO
            </span>{" "}
            Mais Próximo de Você
          </span>
          <Input placeholder="Procurar" icon={Search} />
        </div>
      </div>

      <div className="flex h-full w-[80vw] flex-col gap-6">
        <div className="flex flex-row gap-4">
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
