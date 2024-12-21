// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useMapPosition } from '@/contexts/MapPositionContext';
import { useEffect, useState } from 'react';
import Spinner from './spinner';
import Button from './map-button';

// import Button from './Button';
// import BackButton from './BackButton';

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(Number(char) - 65));
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const {
    mapPosition: [lat, lng]
  } = useMapPosition();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');

  const [emoji, setEmoji] = useState('');
  const [geocodingError, setGeocodingError] = useState('');

  useEffect(
    function () {
      if (!lat && !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError('');

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😉"
            );

          setCityName(data.city || data.locality || '');
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          if (err instanceof Error) {
            setGeocodingError(err.message);
          } else {
            setGeocodingError('An error occurred. Please try again.');
          }
        } finally {
          setIsLoadingGeocoding(false);
        }
      }

      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!cityName) return;

    // const newCity = {
    //   cityName,
    //   country,
    //   emoji,
    //   date,
    //   notes,
    //   position: { lat, lng }
    // };

    // await createCity(newCity);
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return (
      <p className="mx-auto my-5 w-4/5 text-center text-[18px] font-semibold">
        <span role="img">👋</span> Start by clicking somewhere on the map
      </p>
    );

  if (geocodingError)
    return (
      <p className="mx-auto my-5 w-4/5 text-center text-[18px] font-semibold">
        <span role="img">👋</span> {geocodingError}
      </p>
    );

  return (
    <form
      className="flex w-full flex-col gap-8 rounded-lg bg-[#42484d] px-7 py-5"
      onSubmit={handleSubmit}
    >
      <div className="relative flex flex-col gap-1">
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className="absolute right-3 top-7 text-[28px]">{emoji}</span>
      </div>

      <div className="relative flex flex-col gap-1">
        <label htmlFor="name">Branch name</label>
        <input
          id="name"
          onChange={(e) => setBranchName(e.target.value)}
          value={branchName}
        />
      </div>

      <div className="flex justify-between">
        <Button type="primary" onClick={() => {}}>
          Add
        </Button>
        {/* <BackButton /> */}
      </div>
    </form>
  );
}

export default Form;
