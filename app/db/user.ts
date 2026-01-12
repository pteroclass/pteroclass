import { boolean, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
    id: varchar('id', { length: 36 }).primaryKey().default(crypto.randomUUID()),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 60 }).notNull(),
    role: varchar('role', { length: 7 }).notNull().default('student'),
    is_verified: boolean('is_verified').notNull().default(false),
});

export type User = typeof users.$inferInsert;
