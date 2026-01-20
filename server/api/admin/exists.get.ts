export default defineEventHandler(async () => {
    const adminExists =
        (await db.query.users.findFirst({
            where: (u, { eq }) => eq(u.role, 'admin'),
        })) != undefined;
    return { success: adminExists };
});
