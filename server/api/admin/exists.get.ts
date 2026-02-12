import { db, schema } from '@nuxthub/db';
import { eq } from 'drizzle-orm';

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
