import z from 'zod';

export default defineEventHandler(async (e) => {
    if (adminExists) {
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
});
