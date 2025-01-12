import { z } from 'zod';

export const quizSchema = z.object({
  id: z.number(),
  event_id: z.number(),
  quiz_genre: z.string(),
  content: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      answer: z.string()
    })
  ),
  created_at: z.string().datetime()
});

export const quizContentSchema = z.object({
  options: z.array(z.string()),
  question: z.string(),
  answer: z.string()
});

export type QuizValue = z.infer<typeof quizSchema>;
export type QuizContentValue = z.infer<typeof quizContentSchema>;
