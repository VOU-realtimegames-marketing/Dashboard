import { ScrollArea } from '@/components/ui/scroll-area';
import { QuizCard } from './quiz-card';
import { GetQuizzesByEventId } from '@/lib/event';

export default async function QuizPage({ eventId }: { eventId: string }) {
  const { quiz } = await GetQuizzesByEventId(Number(eventId));
  // console.log(quiz);

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">Event Quizzes</h1>
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
