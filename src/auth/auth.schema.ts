import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email({
      message: 'Invalid email address',
    }),
    password: z
      .string({ required_error: 'Password is requried' })
      .min(6, 'Password must be at least 6 characters'),
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>['body'];
