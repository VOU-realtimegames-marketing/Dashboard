'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react';

type EventDateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

type EventDateContextType = {
  range: EventDateRange;
  setRange: Dispatch<SetStateAction<EventDateRange>>;
  resetRange: () => void;
};

const EventDateContext = createContext<EventDateContextType>(null!);

const initialState = { from: undefined, to: undefined };

function EventDateProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<EventDateRange>(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <EventDateContext.Provider
      value={{
        range,
        setRange,
        resetRange
      }}
    >
      {children}
    </EventDateContext.Provider>
  );
}

function useEventDate() {
  const context = useContext<EventDateContextType>(EventDateContext);
  if (context === undefined)
    throw new Error('Context was used outside Provider');
  return context;
}

export { EventDateProvider, useEventDate };
