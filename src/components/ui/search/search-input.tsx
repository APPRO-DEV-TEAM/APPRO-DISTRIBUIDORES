import { ElementType } from "react";

interface SearchInputProps {
  icon?: ElementType;
  value: string;
  onSearch?: (value: string) => void;
  onChange: (text: string) => void;
}

export function SearchInput({
  icon: Icon,
  onChange,
  onSearch,
  value,
}: SearchInputProps) {
  return (
    <div className="flex w-[70vw] flex-row items-center rounded-xl border bg-slate-100 sm:h-16">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="h-full w-full border-none bg-transparent px-4 placeholder:text-[#2B2A2A]"
        placeholder="Digite um endereço..."
      />
      {Icon && (
        <button
          onClick={() => onSearch}
          className="mr-4 cursor-pointer rounded-lg p-3 hover:bg-zinc-300 active:bg-zinc-200 sm:mr-5 sm:p-5"
        >
          <Icon color="#2B2A2A" />
        </button>
      )}
    </div>
  );
}
