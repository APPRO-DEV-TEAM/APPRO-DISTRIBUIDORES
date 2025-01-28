import MaskedInput from "react-text-mask";

interface InputMaskProps {
  onChange: (value: string) => void;
}

export function InputMask({ onChange }: InputMaskProps) {
  return (
    <MaskedInput
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
      placeholder="00000-000"
      className="flex h-14 w-72 items-center justify-center rounded-lg bg-[#d4d4d4] px-10 py-4 text-lg font-normal shadow-sm"
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
