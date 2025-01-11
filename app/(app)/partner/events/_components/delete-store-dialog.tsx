'use client';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Dispatch, SetStateAction, useTransition } from 'react';
import { StoreValue } from '../_data/schema';
import { deleteStoreAction } from '@/lib/action/store';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function DeleteStoreDialog({
  store,
  setIsOpen
}: {
  store: StoreValue;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loading, startTransition] = useTransition();

  const handleDelete = async (data: StoreValue) => {
    startTransition(async () => {
      try {
        await deleteStoreAction(data);
        toast.success('Store deleted successfully!');
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error('An unexpected error occurred');
        }
      }
      setIsOpen(false);
    });
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete store {store.name}</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this store permanently? This action
          cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setIsOpen(false)} disabled={loading}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={() => handleDelete(store)}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting
            </>
          ) : (
            <span>Delete</span>
          )}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
