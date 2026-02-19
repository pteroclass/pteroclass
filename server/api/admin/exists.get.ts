import { db, schema } from '@nuxthub/db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async () => {
    const adminExists =
        (await db.query.users.findFirst({
            where: eq(schema.users.role, 'admin'),
        })) != undefined;
    return { success: adminExists };
});
