// src/hooks/use-distributors.tsx
import { useDistributorsContext } from "../contexts/distributors-context";

export function useDistributors() {
  return useDistributorsContext();
}
