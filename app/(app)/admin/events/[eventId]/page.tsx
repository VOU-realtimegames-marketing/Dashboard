import { getEventById } from '@/lib/event';
import { QUIZ_GAME_ID } from '../_data/schema';
import QuizPage from './_components/quiz-page';
import PhoneShakePage from './_components/phone-shake-page';

export default async function EventPage({
  params: { eventId }
}: {
  params: { eventId: string };
}) {
  const { event } = await getEventById(Number(eventId));
  if (!event) {
    return <div>Event not found</div>;
  }

  if (event.game_id === QUIZ_GAME_ID) {
    return <QuizPage event={event} />;
  }

  return <PhoneShakePage event={event} />;
}
