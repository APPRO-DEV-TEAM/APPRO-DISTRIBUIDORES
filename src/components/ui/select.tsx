interface OptionsProps {
  id: string;
  value: string;
  label: string;
}

export interface SelectInputProps {
  options: OptionsProps[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const SelectInput = ({
  options,
  placeholder,
  value,
  onChange,
}: SelectInputProps) => {
  return (
    <span className="flex h-14 w-full items-center justify-center rounded-lg bg-[#d4d4d4] px-4 font-normal shadow-sm sm:w-72">
      <select
        className="w-full py-4 pr-10 text-base sm:text-lg"
        value={value} // Para garantir que o valor selecionado é o estado atual
        onChange={(e) => {
          onChange(e.target.value); // Chama o onChange do componente pai
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option: OptionsProps) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </span>
  );
};
