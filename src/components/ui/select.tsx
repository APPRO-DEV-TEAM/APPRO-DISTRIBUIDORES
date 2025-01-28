interface OptionsProps {
  id: string;
  value: string;
  label: string;
}

export interface SelectInputProps {
  options: OptionsProps[];
  placeholder: string;
  onChange: (value: string) => void;
}

export const SelectInput = ({
  options,
  placeholder,
  onChange,
}: SelectInputProps) => {
  return (
    <span className="flex h-14 w-72 items-center justify-center rounded-lg bg-[#d4d4d4] px-4 font-normal shadow-sm">
      <select
        className="w-[80%] px-10 py-4 text-lg"
        name={placeholder}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option: OptionsProps) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </span>
  );
};
