import bcrypt from 'bcrypt';
import z from 'zod';

export default defineEventHandler(async (e) => {
    const { success } = await $fetch('/api/admin/exists');
    if (success) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Admin already exists',
        });
    }
    const body = await readValidatedBody(e, adminZodSchema.safeParse);
    if (!body.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid request body',
            data: z.treeifyError(body.error),
        });
    }
    const { email, password, role, verified } = body.data;
    const hashedPassword = await bcrypt.hash(password, 12);
    const isVerified = verified == 'Yes';
    await db.insert(schema.users).values({
        email,
        password: hashedPassword,
        role,
        is_verified: isVerified,
    });
    if (!isVerified) {
        setUserSession(e, {
            user: {
                email,
            },
        });
        return {
            message: 'You need to change your password',
            needsVerification: true,
            success: false,
        };
    }
    return {
        message: 'Admin registered successfully',
        needsVerification: false,
        success: true,
    };
});
