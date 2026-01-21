import z from 'zod';

export const zodRoleEnum = z.enum(['student', 'teacher', 'admin']);

export const adminZodSchema = z.object({
    email: z.email(),
    password: z.string(),
    role: zodRoleEnum,
    verified: z.enum(['Yes', 'No']),
});

export const loginZodSchema = z.object({
    email: z.email(),
    password: z.string(),
});

export type AdminSchema = z.infer<typeof adminZodSchema>;

export type LoginSchema = z.infer<typeof loginZodSchema>;
