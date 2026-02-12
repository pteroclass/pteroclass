import { db, schema } from '@nuxthub/db';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import z from 'zod';

export default defineEventHandler(async (e) => {
    const withEmail = changePasswordZodSchema.safeExtend({ email: z.email() });
    const body = await readValidatedBody(e, withEmail.safeParse);
    if (!body.success) {
        setResponseStatus(e, 406);
        return { message: 'Body not parsed correctly', success: false };
    }
    const { email, password } = body.data;
    const hashedPassword = await bcrypt.hash(password, 12);
    await db
        .update(schema.users)
        .set({ password: hashedPassword, is_verified: true })
        .where(eq(schema.users.email, email));
    await setUserSession(e, {
        user: {
            email,
            password: hashedPassword,
        },
    });
    setResponseStatus(e, 201);
    return { message: 'User registered successfully', success: true };
});
