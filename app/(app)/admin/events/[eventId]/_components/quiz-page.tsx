import { ScrollArea } from '@/components/ui/scroll-area';
import { QuizCard } from './quiz-card';
import { GetQuizzesByEventId } from '@/lib/event';
import { EventValue } from '../../_data/schema';
import { format } from 'date-fns';

export default async function QuizPage({ event }: { event: EventValue }) {
  const { quiz } = await GetQuizzesByEventId(Number(event.id));
  // console.log(quiz);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{event.name}</h1>
        <div className="mt-2 text-sm text-muted-foreground">
          <span>From: {format(new Date(event.start_time), 'PPP')}</span>
          <span className="mx-2">•</span>
          <span>To: {format(new Date(event.end_time), 'PPP')}</span>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {quiz.content.map((quiz, i) => (
            <QuizCard key={i} quiz={quiz} number={i + 1} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
