'use client';

import { useMapPosition } from '@/contexts/MapPositionContext';
import { Branch } from '../_data/schema';
import BranchList from './branch-list';
import Form from './form';

export default function Sidebar({ branchs }: { branchs: Branch[] }) {
  const { isClickMap } = useMapPosition();

  return (
    <div className="flex basis-1/3 flex-col items-center bg-[#2d3439] px-8 py-4">
      {!isClickMap ? <BranchList branchs={branchs} /> : <Form />}
      {/* <BranchList branchs={branchs} /> */}
    </div>
  );
}
