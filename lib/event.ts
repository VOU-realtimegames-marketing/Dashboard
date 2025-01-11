import { EventValue } from '@/app/(app)/partner/events/_data/schema';

type Events = {
  events: EventValue[];
};
export async function getEventsOfOwner(owner: string): Promise<Events> {
  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/events/${owner}`,
    {
      next: { revalidate: 0 }
    }
  );

  if (!response.ok) {
    return { events: [] };
  }

  const events = await response.json();
  return events;
}
