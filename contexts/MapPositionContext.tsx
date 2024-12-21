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

type MapPositionContextType = {
  mapPosition: MapPosition;
  setMapPosition: Dispatch<SetStateAction<MapPosition>>;
  resetPosition: () => void;
  isClickMap: Boolean;
  setIsClickMap: Dispatch<SetStateAction<Boolean>>;
};

const MapPositionContext = createContext<MapPositionContextType>(null!);

const initialPosition: MapPosition = [10, 106];

function MapPositionProvider({ children }: { children: ReactNode }) {
  const [mapPosition, setMapPosition] = useState<MapPosition>(initialPosition);
  const [isClickMap, setIsClickMap] = useState<Boolean>(false);

  const resetPosition = () => setMapPosition(initialPosition);

  return (
    <MapPositionContext.Provider
      value={{
        mapPosition,
        setMapPosition,
        resetPosition,
        isClickMap,
        setIsClickMap
      }}
    >
      {children}
    </MapPositionContext.Provider>
  );
}

function useMapPosition() {
  const context = useContext<MapPositionContextType>(MapPositionContext);
  if (context === undefined)
    throw new Error('Context was used outside Provider');
  return context;
}

export { MapPositionProvider, useMapPosition };
