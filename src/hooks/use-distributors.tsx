// src/hooks/use-distributors.ts
import { useState, useCallback } from "react";
import { api } from "../services/api";
import { DistributorProps } from "../types/distributors.types";
import { useLocate } from "./use-locate";

export const useDistributors = () => {
  const [distributors, setDistributors] = useState<DistributorProps[]>([]);
  const { handleDistributorsLocation } = useLocate();

  const loadDistributors = useCallback(async () => {
    try {
      const response = await api.get<DistributorProps[]>("/distributors");
      setDistributors(response.data);
      handleDistributorsLocation(response.data);
    } catch (error) {
      console.error("Erro ao buscar distribuidores:", error);
    }
  }, [handleDistributorsLocation]);

  return { distributors, loadDistributors };
};
