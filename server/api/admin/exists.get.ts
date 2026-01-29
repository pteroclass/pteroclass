import { eq } from 'drizzle-orm';
import { db, schema } from 'hub:db';

export default defineEventHandler(async () => {
    const adminExists =
        (
            await db
                .select()
                .from(schema.users)
                .where(eq(schema.users.role, 'admin'))
        ).length > 0;
    return { success: adminExists };
});
