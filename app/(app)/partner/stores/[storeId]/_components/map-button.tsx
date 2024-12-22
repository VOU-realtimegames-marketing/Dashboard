function BaseButton({
  children,
  onClick,
  className,
  isLoading
}: {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
  isLoading?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`font-inherit cursor-pointer rounded px-4 py-2 text-base uppercase ${className} ${
        isLoading
          ? 'pointer-events-none border border-[#aaa] bg-[#aaa] text-[#242a2e]'
          : ''
      }`}
      disabled={isLoading}
    >
      {children}
    </button>
  );
}

function Button({
  children,
  onClick,
  variant,
  type,
  isLoading
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant: 'primary' | 'back' | 'position';
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
}) {
  if (variant === 'position') {
    return (
      <BaseButton
        onClick={onClick}
        className="absolute bottom-8 left-1/2 z-[1000] -translate-x-1/2 transform bg-[#00c46a] font-bold text-[#2d3439] shadow-lg"
      >
        {children}
      </BaseButton>
    );
  }

  if (variant === 'primary') {
    return (
      <BaseButton
        onClick={onClick}
        className="bg-[#00c46a] text-sm font-bold text-[#2d3439]"
        isLoading={isLoading}
      >
        {children}
      </BaseButton>
    );
  }

  if (variant === 'back') {
    return (
      <BaseButton
        onClick={onClick}
        className="border border-[#ececec] bg-none text-sm font-semibold text-[#ececec]"
        isLoading={isLoading}
      >
        {children}
      </BaseButton>
    );
  }
}

export default Button;
