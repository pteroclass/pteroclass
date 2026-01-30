import bcrypt from 'bcrypt';
import { db, schema } from '@nuxthub/db';

export default defineEventHandler(async (e) => {
    const { success } = await $fetch('/api/admin/exists');
    if (success) {
        setResponseStatus(e, 409);
        return { message: 'Admin already exists', success: false as const };
    }
    const body = await readValidatedBody(e, adminZodSchema.safeParse);
    if (!body.success) {
        setResponseStatus(e, 406);
        return {
            message: 'Body not parsed correctly',
            success: false as const,
        };
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
        setResponseStatus(e, 412);
        return {
            message: 'You need to change your password',
            needsVerification: true,
            success: true as const,
        };
    }
    setUserSession(e, {
        user: {
            email,
            password: hashedPassword,
        },
    });
    setResponseStatus(e, 201);
    return {
        message: 'Admin registered successfully',
        needsVerification: false,
        success: true as const,
    };
});
