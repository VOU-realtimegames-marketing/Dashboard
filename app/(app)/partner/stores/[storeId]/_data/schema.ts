export type Position = {
  lat: number;
  lng: number;
};

export type MapPosition = [number, number];

export type Branch = {
  id: number;
  store_id: number;
  name: string;
  position: string;
  city_name: string;
  country: string;
  address: string;
  emoji: string;
};
