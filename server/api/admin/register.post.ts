import bcrypt from 'bcrypt';
import z from 'zod';

export default defineEventHandler(async (e) => {
    const success = await $fetch('/api/admin/exists');
    if (success) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Admin already exists',
        });
    }
    const body = await readBody(e);
    const parsedBody = adminZodSchema.safeParse(body);
    if (!parsedBody.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid request body',
            data: z.treeifyError(parsedBody.error),
        });
    }
    const { email, password, role, verified } = parsedBody.data;
    const hashedPassword = await bcrypt.hash(password, 12);
    const is_verified = verified == 'Yes';
    await db.insert(schema.users).values({
        email,
        password: hashedPassword,
        role,
        is_verified,
    });
    if (!is_verified) {
        return { message: 'You need to change your password', success: false };
    }
    return { message: 'Admin registered successfully', success: true };
});
