import { MapPositionProvider } from '@/contexts/MapPositionContext';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./_components/map'), {
  loading: () => <p>Loading map...</p>,
  ssr: false
});

export default async function StorePage({ storeId }: { storeId: string }) {
  return (
    <div className="relative flex h-full overscroll-y-none p-4">
      <MapPositionProvider>
        <Map />
        <div className="flex basis-1/3 flex-col items-center bg-[#2d3439] px-20 py-12"></div>
      </MapPositionProvider>
    </div>
  );
}
