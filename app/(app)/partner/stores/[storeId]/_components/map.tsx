'use client';

import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents
} from 'react-leaflet';
// import { useCities } from '../contexts/CitiesContext';
import { MapPosition } from '../_data/schema';
import { useGeolocation } from '@/hooks/use-geolocation';
import { useMapPosition } from '@/contexts/MapPositionContext';
import Button from './map-button';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import './map.style.css';

function Map() {
  // const { cities } = useCities();
  const { mapPosition, setMapPosition } = useMapPosition();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition
  } = useGeolocation();

  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition, setMapPosition]
  );

  return (
    <div className="relative h-full flex-1 bg-[var(--color-gray-100)]">
      {!geolocationPosition && (
        <Button onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className="h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {/* {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))} */}

        <ChangeCenter position={mapPosition} />
        <DetectClick setMapPosition={setMapPosition} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: { position: MapPosition }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick({
  setMapPosition
}: {
  setMapPosition: (position: MapPosition) => void;
}) {
  useMapEvents({
    click: (e) => setMapPosition([e.latlng.lat, e.latlng.lng])
  });
  return null;
}

export default Map;
