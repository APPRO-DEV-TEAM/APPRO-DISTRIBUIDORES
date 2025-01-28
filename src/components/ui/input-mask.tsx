import React from "react";
import IMask from "react-input-mask";

interface InputMaskProps {
  onChange: (value: string) => void;
}

export function InputMask({ onChange }: InputMaskProps) {
  return (
    <IMask
      mask="99999-999"
      maskChar=" "
      onChange={(e) => onChange(e.target.value)}
    >
      {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
        <input
          className="flex h-14 w-72 items-center justify-center rounded-lg bg-[#d4d4d4] px-10 py-4 text-lg font-normal shadow-sm"
          type="text"
          {...inputProps}
        />
      )}
    </IMask>
  );
}
