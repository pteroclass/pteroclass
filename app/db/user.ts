import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const userTable = mysqlTable('users', {
    id: varchar('id', { length: 36 }).primaryKey().default(crypto.randomUUID()),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 60 }).notNull(),
    role: varchar('role', { length: 7 }).notNull().default('student'),
});
