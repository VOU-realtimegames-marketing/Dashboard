function Spinner() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="mask-[radial-gradient(farthest-side,_#0000_calc(100%_-_8px),_#000_0)] h-24 w-24 animate-spin-custom rounded-full bg-[conic-gradient(#0000_10%,#ececec)]"></div>
    </div>
  );
}

export default Spinner;
