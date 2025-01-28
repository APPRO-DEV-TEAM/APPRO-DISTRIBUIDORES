import { Search } from "lucide-react";
import bannerWeb from "./assets/banner-web.png";
import { Input } from "./components/ui/input";
import { useState } from "react";
import { SelectInput } from "./components/ui/select";
import { InputMask } from "./components/ui/input-mask";
import { Tabs } from "@base-ui-components/react";
import { Local } from "./assets/icons/local";
import { List } from "./assets/icons/list";

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
          <span className="text-4xl font-light text-white">
            Encontre o{" "}
            <span className="font-dmSans bg-gradient-to-r from-[#ffe1b7] via-[#fff0d7] to-[#a79172] bg-clip-text font-medium text-transparent">
              Distribuidor APPRO
            </span>{" "}
            Mais Próximo de Você
          </span>
          <Input placeholder="Procurar" icon={Search} />
        </div>
      </div>

      <div className="flex h-full w-[80%] flex-col gap-6">
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
        <Tabs.Root
          className="w-[375px] rounded-md py-4 text-lg"
          defaultValue="1"
        >
          <Tabs.List className="relative z-0 flex gap-10 border-b border-b-[#363636] px-1 pb-2">
            <Tabs.Tab
              value="1"
              className="flex flex-row items-center justify-center gap-2"
            >
              <List />
              Exibição de lista
            </Tabs.Tab>
            <Tabs.Tab
              value="2"
              className="flex flex-row items-center justify-center gap-2"
            >
              <Local />
              Visão do mapa
            </Tabs.Tab>
            <Tabs.Indicator className="absolute top-1/2 left-[-22px] z-[-1] h-6 w-[197px] -translate-y-1/2 translate-x-[var(--active-tab-left)] border-b-[6px] border-b-[#846944] px-10 pb-10 transition-all duration-200 ease-in-out" />
          </Tabs.List>

          <Tabs.Panel value="1">
            <div>sfajdssakj</div>
          </Tabs.Panel>
          <Tabs.Panel value="2">
            <div>skdaksd</div>
          </Tabs.Panel>
        </Tabs.Root>
      </div>
    </div>
  );
}

export default App;
