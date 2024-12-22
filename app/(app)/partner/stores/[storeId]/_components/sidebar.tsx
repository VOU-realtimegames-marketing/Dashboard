'use client';

import { useMapPosition } from '@/contexts/MapPositionContext';
import { Branch } from '../_data/schema';
import BranchList from './branch-list';
import Form from './form';

export default function Sidebar({
  branchs,
  storeId
}: {
  branchs: Branch[];
  storeId: string;
}) {
  const { isClickMap } = useMapPosition();

  return (
    <div className="flex basis-1/3 flex-col items-center justify-around bg-[#2d3439] px-8 py-4">
      {!isClickMap ? (
        <BranchList branchs={branchs} />
      ) : (
        <Form storeId={storeId} />
      )}
      {/* <BranchList branchs={branchs} /> */}
    </div>
  );
}
