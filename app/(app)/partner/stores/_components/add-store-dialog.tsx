'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Loader2, Plus } from 'lucide-react';
import { createEditStoreSchema, CreateEditStoreValue } from '../_data/schema';
import { createStoreAction } from '@/lib/action/store';
import { toast } from 'sonner';

export default function AddStoreDialog() {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CreateEditStoreValue>({
    resolver: zodResolver(createEditStoreSchema)
  });

  const onSubmit = async (data: CreateEditStoreValue) => {
    try {
      await createStoreAction(data);
      toast.success('Store added successfully!');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
    reset();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add new store
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new store</DialogTitle>
          <DialogDescription>
            Please provide the following details to create a new store.
          </DialogDescription>
        </DialogHeader>

        <form
          id="add-store-form"
          className="mt-4"
          onSubmit={(e) => {
            handleSubmit(onSubmit)(e);
          }}
        >
          <div className="mb-6 flex flex-col gap-1">
            <Label htmlFor="name" className="mb-2">
              Store&apos;s name
            </Label>
            <Input
              placeholder="Input your store's name..."
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
              placeholder="Input your business type..."
              {...register('business_type')}
            ></Input>
            {errors.business_type && (
              <p className="my-1 text-destructive">{`${errors.business_type.message}`}</p>
            )}
          </div>
        </form>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="add-store-form" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding
              </>
            ) : (
              <span>Add</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
