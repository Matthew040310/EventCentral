// dbClient.js
import { PrismaClient } from '@prisma/client';

declare global {
    // Allow global `prisma` to be of type PrismaClient or undefined
    // This is needed for hot-reloading in development
    var singletonPrismaClient: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.singletonPrismaClient) {
        global.singletonPrismaClient = new PrismaClient();
    }
    prisma = global.singletonPrismaClient;
}

export default prisma;
