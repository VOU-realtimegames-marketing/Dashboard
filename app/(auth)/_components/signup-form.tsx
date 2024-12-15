'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const signupFormSchema = z
  .object({
    fullName: z.string().min(2, {
      message: 'Name must be at least 2 characters.'
    }),
    email: z.string().email({ message: 'Enter a valid email address' }),
    username: z
      .string()
      .min(2, { message: 'Username must be at least 2 characters.' })
      .regex(/^[a-z0-9_]+$/, {
        message:
          'Username must contain only lowercase letters, digits, or underscore'
      }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword']
  });

type UserSignupFormValue = z.infer<typeof signupFormSchema>;

export default function SignUpForm() {
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();
  const form = useForm<UserSignupFormValue>({
    resolver: zodResolver(signupFormSchema)
  });

  const onSubmit = async (data: UserSignupFormValue) => {
    startTransition(() => {
      // signIn('credentials', {
      //   fullName: data.fullName,
      //   email: data.email,
      //   username: data.username,
      //   password: data.password,
      //   role: 'partner',
      //   callbackUrl: callbackUrl ?? '/dashboard'
      // });
      toast.success('Signed In Successfully!');
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your full name..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your username..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your confirm password..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="ml-auto w-full" type="submit">
          Sign up
        </Button>
      </form>
    </Form>
  );
}
