import { cookies } from 'next/headers';
import { QuizValue } from '@/app/(app)/partner/events/[eventId]/_data/schema';
import { EventValue } from '@/app/(app)/partner/events/_data/schema';

type Events = {
  events: EventValue[];
};

export async function getEventsOfOwner(owner: string): Promise<Events> {
  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/events/owner/${owner}`,
    {
      next: { revalidate: 60 }
    }
  );

  if (!response.ok) {
    return { events: [] };
  }

  const events = await response.json();
  return events;
}

type Event = {
  event: EventValue;
};

export async function getEventById(
  id: Number
): Promise<Event | { event: null }> {
  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/events/${id}`,
    {
      next: { revalidate: 0 }
    }
  );

  if (!response.ok) {
    return { event: null };
  }

  const event = await response.json();
  return event;
}

type Quiz = {
  quiz: QuizValue;
};

export async function GetQuizzesByEventId(
  eventId: Number
): Promise<Quiz | { quiz: null }> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const response = await fetch(
    `${process.env.API_GATEWAY_URL}/api/v1/quizzes?event_id=${eventId}`,
    {
      method: 'GET',
      headers: {
        cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
      },
      next: { revalidate: 0 }
    }
  );

  if (!response.ok) {
    return { quiz: null };
  }

  const quiz = await response.json();
  return quiz;
}
