'use client';

import { useMapPosition } from '@/contexts/MapPositionContext';
import { Branch } from '../_data/schema';
import BranchList from './branch-list';
import Form from './form';
import { Suspense } from 'react';
import Spinner from './spinner';

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
        <Suspense fallback={<Spinner />}>
          <BranchList branchs={branchs} />
        </Suspense>
      ) : (
        <Form storeId={storeId} />
      )}
    </div>
  );
}
