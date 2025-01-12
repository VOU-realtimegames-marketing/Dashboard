'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Row } from '@tanstack/react-table';
import { Edit, Eye, MoreHorizontal, Trash, CircleCheckBig } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { eventSchema } from '../_data/schema';
import { Dialog } from '@radix-ui/react-dialog';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { updateEventStatusAction } from '@/lib/action/event';
import { toast } from 'sonner';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const event = eventSchema.parse(row.original);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleUpdateStatus = async () => {
    if (row.getValue('status') !== 'not_accepted') return;

    try {
      await updateEventStatusAction(row.getValue('id'));
      toast.success('Status updated successfully!');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <>
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        {/* <EditStoreDialog store={store} setIsOpen={setIsEditOpen} /> */}
      </Dialog>
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        {/* <DeleteStoreDialog store={store} setIsOpen={setIsDeleteOpen} /> */}
      </AlertDialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => router.push(`${pathname}/${row.getValue('id')}`)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View details
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleUpdateStatus()}>
            <CircleCheckBig className="mr-2 h-4 w-4" />
            Accept event
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
