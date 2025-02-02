import { useState, useEffect, useCallback } from "react";

export function useURLState<T>(
  key: string,
  initialState: T,
  serialize: (state: T) => string,
  deserialize: (state: string) => T
): [T, (state: T) => void] {
  const searchParams = new URLSearchParams(window.location.search);
  const existingValue = searchParams.get(key);

  const [state, setState] = useState<T>(
    existingValue ? deserialize(existingValue) : initialState
  );

  // Agora, `memoizedDeserialize` será atualizado corretamente se `deserialize` mudar.
  const memoizedDeserialize = useCallback(deserialize, [deserialize]);

  useEffect(() => {
    const handlePopState = () => {
      const updatedParams = new URLSearchParams(window.location.search);
      setState(
        updatedParams.get(key)
          ? memoizedDeserialize(updatedParams.get(key)!)
          : initialState
      );
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [key, initialState, memoizedDeserialize]);

  const updateState = (newState: T) => {
    setState(newState);
    const newParams = new URLSearchParams(window.location.search);
    newParams.set(key, serialize(newState));

    window.history.pushState({}, "", `?${newParams.toString()}`);
  };

  return [state, updateState];
}
