import { ElementType } from "react";

interface InputProps {
  placeholder: string;
  icon: ElementType;
}

export function Input({ placeholder, icon: Icon }: InputProps) {
  return (
    <div className="flex h-16 w-full flex-row items-center rounded-xl border bg-slate-100">
      <input
        type="text"
        placeholder={placeholder}
        className="h-full flex-1 border-none bg-transparent px-10 placeholder:text-[#2B2A2A]"
      />
      {Icon && (
        <button className="mr-5 rounded-lg p-5 hover:bg-zinc-300">
          <Icon color="#2B2A2A" />
        </button>
      )}
    </div>
  );
}
