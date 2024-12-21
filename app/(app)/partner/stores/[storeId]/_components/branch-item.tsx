'use client';

import { useMapPosition } from '@/contexts/MapPositionContext';
import { Branch } from '../_data/schema';

function BranchItem({ branch }: { branch: Branch }) {
  const { setMapPosition } = useMapPosition();
  const [lat, lng] = branch.position.split(',');

  return (
    <li
      className="flex cursor-pointer items-center gap-4 rounded-lg border-l-[5px] border-[#00c46a] bg-[#42484d] px-3 py-4 text-[#ececec] no-underline"
      onClick={() => setMapPosition([Number(lat), Number(lng)])}
    >
      <span className="text-base leading-none">{branch.emoji}</span>
      <h3 className="mr-auto text-sm font-semibold">{branch.city_name}</h3>
      <span className="mr-auto text-sm font-semibold">{branch.address}</span>
      <button
        className="hover:bg-brand-1 hover:text-dark-1 aspect-square h-8 cursor-pointer rounded-full border-none bg-[#2d3439] text-[1.6rem] font-normal leading-none transition-all duration-200"
        onClick={() => {}}
      >
        &times;
      </button>
    </li>
  );
}

export default BranchItem;
