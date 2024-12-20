'use client';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  createEditStoreSchema,
  CreateEditStoreValue,
  StoreValue
} from '../_data/schema';
import { updateStoreAction } from '@/lib/action/store';
import { toast } from 'sonner';

export default function EditStoreDialog({
  store,
  setIsOpen
}: {
  store: StoreValue;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<CreateEditStoreValue>({
    resolver: zodResolver(createEditStoreSchema),
    defaultValues: {
      name: store.name,
      business_type: store.business_type
    }
  });

  const onSubmit = async (data: CreateEditStoreValue) => {
    const submitData = { ...data, id: store.id, owner: store.owner };
    try {
      await updateStoreAction(submitData);
      toast.success('Store updated successfully!');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
    setIsOpen(false);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit store {store.name}</DialogTitle>
        <DialogDescription>
          Please update the store details below
        </DialogDescription>
      </DialogHeader>
      <form id="edit-store-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 flex flex-col gap-1">
          <Label htmlFor="name" className="mb-2">
            Store&apos;s name
          </Label>
          <Input
            placeholder="Input new name of the store..."
            {...register('name')}
          ></Input>
          {errors.name && (
            <p className="my-1 text-destructive">{`${errors.name.message}`}</p>
          )}
        </div>

        <div className="mb-6 flex flex-col gap-1">
          <Label htmlFor="business_type" className="mb-2">
            Business type
          </Label>
          <Input
            placeholder="Input new business type..."
            {...register('business_type')}
          ></Input>
          {errors.business_type && (
            <p className="my-1 text-destructive">{`${errors.business_type.message}`}</p>
          )}
        </div>
      </form>
      <DialogFooter>
        <Button variant="ghost" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" form="edit-store-form" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving
            </>
          ) : (
            <span>Save</span>
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
