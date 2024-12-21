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
import { Branch, MapPosition } from '../_data/schema';
import { useGeolocation } from '@/hooks/use-geolocation';
import { useMapPosition } from '@/contexts/MapPositionContext';
import Button from './map-button';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import './map.style.css';

function Map({ branchs }: { branchs: Branch[] }) {
  const { mapPosition, setMapPosition, setIsClickMap } = useMapPosition();

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

        {branchs.map((branch) => (
          <Marker
            position={
              branch.position.split(',').map(Number) as [number, number]
            }
            key={branch.id}
          >
            <Popup>
              <span>{branch.emoji}</span> <span>{branch.address}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick
          setMapPosition={setMapPosition}
          setIsClickMap={setIsClickMap}
        />
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
  setMapPosition,
  setIsClickMap
}: {
  setMapPosition: (position: MapPosition) => void;
  setIsClickMap: (is: Boolean) => void;
}) {
  useMapEvents({
    click: (e) => {
      setMapPosition([e.latlng.lat, e.latlng.lng]);
      setIsClickMap(true);
    }
  });
  return null;
}

export default Map;
