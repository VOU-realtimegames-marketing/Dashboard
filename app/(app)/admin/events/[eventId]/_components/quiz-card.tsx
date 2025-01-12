'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { QuizContentValue } from '../_data/schema';
import { cn } from '@/lib/utils';

export function QuizCard({
  quiz,
  number
}: {
  quiz: QuizContentValue;
  number: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Question {number}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{quiz.question}</p>
        <RadioGroup defaultValue={quiz.answer} disabled>
          {quiz.options.map((option, index) => (
            <div
              className={cn(
                'flex items-center space-x-2 rounded-md p-2',
                option === quiz.answer && 'bg-green-100 dark:bg-green-900/20'
              )}
              key={index}
            >
              <RadioGroupItem
                value={option}
                id={`option-${index}`}
                className={cn(
                  option === quiz.answer && 'border-green-500 text-green-500'
                )}
              />
              <Label
                htmlFor={`option-${index}`}
                className={cn(
                  option === quiz.answer &&
                    'font-medium text-green-700 dark:text-green-300'
                )}
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
