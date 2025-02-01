// src/hooks/use-distributors.ts
import { useState, useCallback } from "react";
import { api } from "../services/api";
import { DistributorProps } from "../types/distributors.types";

export const useDistributors = () => {
  const [distributors, setDistributors] = useState<DistributorProps[]>([]);

  const loadDistributors = useCallback(async () => {
    try {
      const response = await api.get<DistributorProps[]>("/distributors");
      setDistributors(response.data);
    } catch (error) {
      console.error("Erro ao buscar distribuidores:", error);
    }
  }, []);

  return { distributors, loadDistributors };
};
