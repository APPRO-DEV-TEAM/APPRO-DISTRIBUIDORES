import { ElementType } from "react";
import { useSearch } from "./search-hooks";

interface SearchInputProps {
  icon?: ElementType;
}

export function SearchInput({ icon: Icon }: SearchInputProps) {
  const { inputValue, handleSearch } = useSearch();

  return (
    <div className="flex w-full flex-row items-center rounded-xl border bg-slate-100 sm:h-16">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleSearch(e.target.value)}
        className="h-full flex-1 border-none bg-transparent px-4 placeholder:text-[#2B2A2A]"
        placeholder="Digite um endereço..."
      />
      {Icon && (
        <button className="mr-4 rounded-lg p-3 hover:bg-zinc-300 active:bg-zinc-200 sm:mr-5 sm:p-5">
          <Icon color="#2B2A2A" />
        </button>
      )}
    </div>
  );
}
