'use client';

import { MapPosition } from '@/app/(app)/partner/stores/[storeId]/_data/schema';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react';

const MapPositionContext = createContext<MapPositionContextType>(null!);

const initialState: MapPosition = [10, 106];

function MapPositionProvider({ children }: { children: ReactNode }) {
  const [mapPosition, setMapPosition] = useState<MapPosition>(initialState);

  const resetPosition = () => setMapPosition(initialState);

  return (
    <MapPositionContext.Provider
      value={{ mapPosition, setMapPosition, resetPosition }}
    >
      {children}
    </MapPositionContext.Provider>
  );
}

type MapPositionContextType = {
  mapPosition: MapPosition;
  setMapPosition: Dispatch<SetStateAction<MapPosition>>;
  resetPosition: () => void;
};

function useMapPosition() {
  const context = useContext<MapPositionContextType>(MapPositionContext);
  if (context === undefined)
    throw new Error('Context was used outside Provider');
  return context;
}

export { MapPositionProvider, useMapPosition };
