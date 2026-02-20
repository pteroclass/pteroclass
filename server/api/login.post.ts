import { db, schema } from '@nuxthub/db';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (e) => {
    const body = await readValidatedBody(e, loginZodSchema.safeParse);
    if (!body.success) {
        setResponseStatus(e, 406);
        return {
            message: 'Body not parsed correctly',
            success: false as const,
        };
    }
    const { email, password, remember, days } = body.data;
    const user = await db.query.users.findFirst({
        where: eq(schema.users.email, email),
    });
    if (!user) {
        setResponseStatus(e, 404);
        return { message: 'User not found', success: false as const };
    }
    const valid = bcrypt.compare(password, user.password);
    if (!valid) {
        setResponseStatus(e, 401);
        return { message: 'Invalid password', success: false as const };
    }
    await setUserSession(
        e,
        {
            user: {
                email,
                password: user.password,
            },
        },
        {
            maxAge: remember
                ? 60 * 60 * 24 * parseInt(days.split(' ')[0] || '21')
                : undefined,
        },
    );
    setResponseStatus(e, 202);
    return { message: 'User logged in successfully', success: true as const };
});
