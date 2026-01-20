import z from 'zod';

export const zodRoleEnum = z.enum(['student', 'teacher', 'admin']);
