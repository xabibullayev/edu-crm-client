type Props = {
  name: string;
  type: string;
  placeholder: string;
  value: any;
  onChange: Function;
};

export default function Input({
  name,
  type,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <input
      name={name}
      className="w-full border rounded-md border-gray-400 p-2 mr-4 outline-none"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e)}
    />
  );
}
