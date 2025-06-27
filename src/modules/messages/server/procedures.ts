import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        return await prisma.message.findMany({
            orderBy: {
                createdAt: "desc",
            }
        });
    }),
    create: baseProcedure
        .input(
            z.object({
                value: z.string().min(1, { message: "Message is required" }),
            })
        )
        .mutation(async ({ input }) => {
            const createdMessage = await prisma.message.create({
                data: {
                    role: "USER",
                    type: "RESULT",
                    content: input.value,
                }
            });
            await inngest.send({
                name: "code-agent/run",
                data: {
                    value: input.value,
                }
            });
            return createdMessage;
        }),
});