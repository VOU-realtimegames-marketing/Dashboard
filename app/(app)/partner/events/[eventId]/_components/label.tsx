export default function Label({
  children,
  className,
  htmlFor
}: {
  children: React.ReactNode;
  className?: string;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-base font-semibold text-[#ececec] ${className}`}
    >
      {children}
    </label>
  );
}
