import MaskedInput from "react-text-mask";

interface InputMaskProps {
  onChange: (value: string) => void;
}

export function InputMask({ onChange }: InputMaskProps) {
  return (
    <MaskedInput
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
      placeholder="00000-000"
      className="flex h-14 w-full items-center justify-center rounded-lg bg-[#d4d4d4] px-10 py-4 text-base font-normal shadow-sm sm:w-72 sm:text-lg"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
