import { useMapPosition } from '@/contexts/MapPositionContext';
import { useEffect, useState, useTransition } from 'react';
import Spinner from './spinner';
import Button from './map-button';
import Label from './label';
import Input from './input';
import { createBranchAction } from '@/lib/action/store';
import { toast } from 'sonner';

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(Number(char) - 65));
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form({ storeId }: { storeId: string }) {
  const {
    mapPosition: [lat, lng],
    setIsClickMap
  } = useMapPosition();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');

  const [emoji, setEmoji] = useState('');
  const [geocodingError, setGeocodingError] = useState('');
  const [isFormLoading, startTransition] = useTransition();

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!cityName || !branchName || !address) return;

    const newBrach = {
      store_id: Number(storeId),
      name: branchName,
      address,
      city_name: cityName,
      country,
      emoji,
      position: `${lat},${lng}`
    };

    startTransition(async () => {
      try {
        await createBranchAction(newBrach);
        toast.success('New Branch Created Successfully!');
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error('An unexpected error occurred');
        }
      }

      setIsClickMap(false);
    });
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return (
      <p className="mx-auto my-5 w-4/5 text-center text-[18px] font-semibold text-[#ececec]">
        <span role="img">👋</span> Start by clicking somewhere on the map
      </p>
    );

  if (geocodingError)
    return (
      <p className="mx-auto my-5 w-4/5 text-center text-[18px] font-semibold text-[#ececec]">
        <span role="img">👋</span> {geocodingError}
      </p>
    );

  return (
    <form
      className={`flex w-full flex-col gap-8 rounded-lg bg-[#42484d] px-7 py-5 ${
        isFormLoading ? 'opacity-30' : ''
      }`}
      onSubmit={handleSubmit}
    >
      <div className="relative flex flex-col gap-1">
        <Label htmlFor="cityName">City name</Label>
        <Input id="cityName" readOnly={true} value={cityName} />
        <span className="absolute right-2 top-6 text-[28px]">{emoji}</span>
      </div>

      <div className="relative flex flex-col gap-1">
        <Label htmlFor="name">Branch name</Label>
        <Input
          id="name"
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
          required={true}
        />
      </div>

      <div className="relative flex flex-col gap-1">
        <Label htmlFor="address">Branch address</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required={true}
        />
      </div>

      <div className="flex justify-between">
        <Button
          variant="primary"
          onClick={() => {}}
          type="submit"
          isLoading={isFormLoading}
        >
          Add
        </Button>
        <Button
          variant="back"
          onClick={() => setIsClickMap(false)}
          isLoading={isFormLoading}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
