// src/contexts/distributors-context.tsx
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { api } from "../services/api";
import type { DistributorProps } from "../types/distributors.types";
import { useLocationContext } from "./location-context"; // Importe o contexto de localização

type DistributorsContextData = {
  distributors: DistributorProps[];
  loadDistributors: () => Promise<void>;
};

const DistributorsContext = createContext<DistributorsContextData | null>(null);

export function DistributorsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [distributors, setDistributors] = useState<DistributorProps[]>([]);
  const { handleDistributorsLocation } = useLocationContext(); // Use o hook do contexto de localização

  const loadDistributors = useCallback(async () => {
    try {
      const response = await api.get<DistributorProps[]>("/distributors");
      setDistributors(response.data);
      handleDistributorsLocation(response.data); // Atualize as localizações após carregar os distribuidores
    } catch (error) {
      console.error("Erro ao buscar distribuidores:", error);
    }
  }, [handleDistributorsLocation]); // Adicione a dependência

  useEffect(() => {
    loadDistributors();
  }, [loadDistributors]);

  return (
    <DistributorsContext.Provider value={{ distributors, loadDistributors }}>
      {children}
    </DistributorsContext.Provider>
  );
}

export function useDistributorsContext() {
  const context = useContext(DistributorsContext);
  if (!context) {
    throw new Error(
      "useDistributorsContext deve ser usado dentro de um DistributorsProvider"
    );
  }
  return context;
}
