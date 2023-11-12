type Props = {
  name: string;
  defaultOption: { value: any; title: String };
  onChange: Function;
  options: any;
};

export default function Select({
  name,
  defaultOption,
  onChange,
  options,
}: Props) {
  return (
    <select
      name={name}
      className="w-full border rounded-md border-gray-400 p-2 outline-none"
      onChange={(e) => onChange(e)}
    >
      <option className="hidden" value={defaultOption.value}>
        {defaultOption.title}
      </option>

      {options.map((option: any) => (
        <option key={option.id} value={option?.value}>
          {option.title}
        </option>
      ))}
    </select>
  );
}
