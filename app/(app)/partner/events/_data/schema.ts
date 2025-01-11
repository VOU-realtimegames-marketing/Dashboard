import { z } from 'zod';

export const eventSchema = z.object({
  id: z.string(),
  name: z.string(),
  store: z.string(),
  game_type: z.string(),
  voucher_quantity: z.number().min(1),
  status: z.string(),
  start_time: z.string(),
  end_time: z.string()
});

export type EventValue = z.infer<typeof eventSchema>;

export const createEventSchema = z.object({
  name: z.string(),
  store_id: z.string(),
  game_id: z.string(),
  voucher_quantity: z.number(),
  start_time: z.date(),
  end_time: z.date(),
  date_range: z.object(
    {
      from: z.date(),
      to: z.date()
    },
    {
      required_error: 'Please select a date range'
    }
  ),
  quiz_genre: z.string().optional(), // optional
  quiz_number: z.number().optional() // optional
});

export type CreateEventValue = z.infer<typeof createEventSchema>;

export const editEventSchema = z.object({
  name: z.string().min(1),
  business_type: z.string().min(1)
});

export type EditEventValue = z.infer<typeof editEventSchema>;
