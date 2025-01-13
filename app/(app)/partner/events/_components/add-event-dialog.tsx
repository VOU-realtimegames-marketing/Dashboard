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
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Loader2, Plus } from 'lucide-react';
import {
  createEventSchema,
  CreateEventValue,
  QUIZ_GAME_ID
} from '../_data/schema';
import { toast } from 'sonner';
import { createEventAction } from '@/lib/action/event';
import { StoreValue } from '../../stores/_data/schema';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import quiz_genres from '../_data/quiz_genre';
import { DateTimePicker } from '@/components/ui/date-time-picker';

export default function AddEventDialog({ stores }: { stores: StoreValue[] }) {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue
  } = useForm<CreateEventValue>({
    resolver: zodResolver(createEventSchema)
  });

  const gameId = watch('game_id');

  const onSubmit = async (data: CreateEventValue) => {
    try {
      // console.log(data);
      await createEventAction(data);
      toast.success('Event added successfully!');
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
    <Dialog open={open} onOpenChange={setOpen} data-focus-trap="false">
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add new event
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new event</DialogTitle>
          <DialogDescription>
            Please provide the following details to create a new event.
          </DialogDescription>
        </DialogHeader>

        <form
          id="add-event-form"
          className="mt-4"
          onSubmit={(e) => {
            handleSubmit(onSubmit)(e);
          }}
        >
          <div className="mb-6 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-5">
              <Label htmlFor="name">Event&apos;s name</Label>
              <Input
                className="w-[250px]"
                placeholder="Input your event's name..."
                {...register('name')}
              ></Input>
            </div>
            {errors.name && (
              <p className="my-1 self-end text-destructive">{`${errors.name.message}`}</p>
            )}
          </div>

          <div className="mb-6 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-5">
              <Label htmlFor="voucher_quantity">Voucher quantity</Label>
              <Input
                className="w-[250px]"
                placeholder="Input event's voucher quantity..."
                type="number"
                {...register('voucher_quantity', {
                  valueAsNumber: true
                })}
              ></Input>
            </div>
            {errors.voucher_quantity && (
              <p className="my-1 self-end text-destructive">{`${errors.voucher_quantity.message}`}</p>
            )}
          </div>

          <div className="mb-6 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-5">
              <Label htmlFor="store_id">Store</Label>
              <Controller
                name="store_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Select a store" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {stores.map((store) => (
                          <SelectItem value={store.id} key={store.id}>
                            {store.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {errors.store_id && (
              <p className="my-1 self-end text-destructive">{`${errors.store_id.message}`}</p>
            )}
          </div>

          <div className="mb-6 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-5">
              <Label htmlFor="game_id">Game type</Label>
              <Controller
                name="game_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="Select a game type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">Quiz game</SelectItem>
                        <SelectItem value="2">Phone shake game</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {errors.game_id && (
              <p className="my-1 self-end text-destructive">{`${errors.game_id.message}`}</p>
            )}
          </div>

          {gameId === QUIZ_GAME_ID && (
            <>
              <div className="mb-6 flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between gap-5">
                  <Label htmlFor="quiz_genre">Quiz genre</Label>
                  <Controller
                    name="quiz_genre"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[250px]">
                          <SelectValue placeholder="Select quiz genre" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px] overflow-y-auto">
                          <SelectGroup>
                            {quiz_genres.map((genre) => (
                              <SelectItem value={genre} key={genre}>
                                {genre}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                {errors.quiz_genre && (
                  <p className="my-1 self-end text-destructive">{`${errors.quiz_genre.message}`}</p>
                )}
              </div>
              <div className="mb-6 flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between gap-5">
                  <Label htmlFor="quiz_number">Number of quizzes</Label>
                  <Input
                    placeholder="Input number of quizzes..."
                    className="w-[250px]"
                    type="number"
                    {...register('quiz_number', {
                      valueAsNumber: true
                    })}
                  ></Input>
                </div>
                {errors.quiz_number && (
                  <p className="my-1 self-end text-destructive">{`${errors.quiz_number.message}`}</p>
                )}
              </div>
            </>
          )}

          <div className="mb-6 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-5">
              <Label htmlFor="start_time">Start time</Label>
              <Controller
                name="start_time"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    date={field.value}
                    setDate={(date) => {
                      field.onChange(date);
                      if (date) {
                        setValue('start_time', date as Date);
                      }
                    }}
                  />
                )}
              />
            </div>
            {errors.start_time && (
              <p className="my-1 self-end text-destructive">{`${errors.start_time.message}`}</p>
            )}
          </div>

          <div className="mb-6 flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-5">
              <Label htmlFor="end_time">End time</Label>
              <Controller
                name="end_time"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    date={field.value}
                    setDate={(date) => {
                      field.onChange(date);
                      if (date) {
                        setValue('end_time', date as Date);
                      }
                    }}
                  />
                )}
              />
            </div>
            {errors.end_time && (
              <p className="my-1 self-end text-destructive">{`${errors.end_time.message}`}</p>
            )}
          </div>
        </form>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" form="add-event-form" disabled={isSubmitting}>
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
