export default function Input({
  value,
  onChange,
  className,
  id,
  readOnly = false,
  required = false
}: {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id: string;
  readOnly?: boolean;
  required?: boolean;
}) {
  return (
    <input
      className={`font-inherit w-full rounded-md border-none bg-[#d6dee0] px-3 py-2 text-base transition-all duration-200 ${className}`}
      id={id}
      readOnly={readOnly}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
}
