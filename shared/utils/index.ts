import z from 'zod';

export const zodRoleEnum = z.enum(['student', 'teacher', 'admin']);

export const adminZodSchema = z.object({
    email: z.email(),
    password: z.string(),
    role: zodRoleEnum,
    verified: z.enum(['Yes', 'No']),
});

export type AdminSchema = z.infer<typeof adminZodSchema>;
