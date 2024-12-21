function Button({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="font-inherit text-dark-1 absolute bottom-8 left-1/2 z-[1000] -translate-x-1/2 transform cursor-pointer rounded bg-[#00c46a] px-6 py-3 text-sm font-bold uppercase text-inherit shadow-lg"
    >
      {children}
    </button>
  );
}

export default Button;
