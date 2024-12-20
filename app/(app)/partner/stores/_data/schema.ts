import { z } from 'zod';

export const storeSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  business_type: z.string()
});

export type Store = z.infer<typeof storeSchema>;
