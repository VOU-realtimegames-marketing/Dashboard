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
    <div className="flex basis-1/3 flex-col items-center bg-[#2d3439] px-8 py-4">
      <h2 className="mb-4 pb-8 pt-5 text-center text-2xl font-semibold uppercase text-[#ececec]">
        Branches management
      </h2>

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
