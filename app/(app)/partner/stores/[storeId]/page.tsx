import { MapPositionProvider } from '@/contexts/MapPositionContext';
import dynamic from 'next/dynamic';
import Sidebar from './_components/sidebar';
import { getBranchs } from '@/lib/store';
import { Spinner } from '@/components/ui/spinner';

const Map = dynamic(() => import('./_components/map'), {
  loading: () => <Spinner />,
  ssr: false
});

export default async function StorePage({
  params: { storeId }
}: {
  params: { storeId: string };
}) {
  const { branchs = [] } = await getBranchs(storeId);

  return (
    <div className="relative flex h-full overscroll-y-none p-4">
      <MapPositionProvider>
        <Map branchs={branchs} />
        <Sidebar branchs={branchs} storeId={storeId} />
      </MapPositionProvider>
    </div>
  );
}
