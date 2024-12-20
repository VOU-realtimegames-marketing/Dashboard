import { z } from 'zod';

export const storeSchema = z.object({
  id: z.string(),
  name: z.string(),
  owner: z.string(),
  business_type: z.string()
});

export type StoreValue = z.infer<typeof storeSchema>;

export const createEditStoreSchema = z.object({
  name: z.string().min(1),
  business_type: z.string().min(1)
});

export type CreateEditStoreValue = z.infer<typeof createEditStoreSchema>;
