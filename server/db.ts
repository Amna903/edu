import { PrismaClient } from "@prisma/client";
import { prisma } from "./prisma.js";

export const db: PrismaClient = prisma;
