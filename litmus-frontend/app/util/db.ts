import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "../../../litmus-backend/node_modules/prisma/prisma-client/edge";


const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
}

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        log: ['query'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;