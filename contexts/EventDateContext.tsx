'use client';

import { addDays } from 'date-fns';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { DateRange } from 'react-day-picker';

type EventDateContextType =
  | {
      range: DateRange | undefined;
      setRange: Dispatch<SetStateAction<DateRange | undefined>>;
      resetRange: () => void;
    }
  | undefined;

const EventDateContext = createContext<EventDateContextType>(undefined);

const initialState = {
  from: undefined,
  to: undefined
};

function EventDateProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);

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
