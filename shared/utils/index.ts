import z from 'zod';

export const zodRoleEnum = z.enum(
    ['student', 'teacher', 'admin'],
    'Not a valid role!',
);

export const zodVerifiedEnum = z.enum(
    ['Yes', 'No'],
    'Not a valid verified status!',
);

export const adminZodSchema = z.object({
    email: z.email('Not a valid email address!'),
    password: z.string().min(8, 'Not a valid password!'),
    role: zodRoleEnum,
    verified: zodVerifiedEnum,
});

export const loginZodSchema = z.object({
    email: z.email('Not a valid email address!'),
    password: z.string().min(8, 'Not a valid password!'),
    remember: z.boolean(),
});

export const changePasswordZodSchema = z.object({
    password: z.string().min(8, 'Not a valid password!'),
});

export type Role = z.infer<typeof zodRoleEnum>;

export type Verified = z.infer<typeof zodVerifiedEnum>;

export type AdminSchema = z.infer<typeof adminZodSchema>;

export type LoginSchema = z.infer<typeof loginZodSchema>;

export type ChangePasswordSchema = z.infer<typeof changePasswordZodSchema>;
