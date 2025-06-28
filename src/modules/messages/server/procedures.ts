import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(
            z.object({
                projectId: z
                    .string()
                    .min(1, { message: "Project ID is required" })
                    .uuid({ message: "Project ID is invalid" }),
            })
        )
        .query(async ({ input }) => {
            return await prisma.message.findMany({
                where: {
                    projectId: input.projectId,
                },
                include: {
                    fragment: true,
                },
                orderBy: {
                    createdAt: "asc",
                }
            });
        }),
    create: baseProcedure
        .input(
            z.object({
                value: z
                    .string()
                    .min(1, { message: "Value is required" })
                    .max(1000, { message: "Value is too long" }),
                projectId: z
                    .string()
                    .min(1, { message: "Project ID is required" })
                    .uuid({ message: "Project ID is invalid" }),
            })
        )
        .mutation(async ({ input }) => {
            const createdMessage = await prisma.message.create({
                data: {
                    projectId: input.projectId,
                    role: "USER",
                    type: "RESULT",
                    content: input.value,
                }
            });
            await inngest.send({
                name: "code-agent/run",
                data: {
                    value: input.value,
                    projectId: input.projectId,
                }
            });
            return createdMessage;
        }),
});