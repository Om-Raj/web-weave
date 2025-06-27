import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { prisma } from "@/lib/db";

export const fragmentsRouter = createTRPCRouter({
    create: baseProcedure
        .input(
            z.object({
                messageId: z.string().uuid(),
                sandboxUrl: z.string(),
                title: z.string(),
                files: z.object({
                    path: z.string(),
                    content: z.string(),
                }),
            })
        )
        .mutation(async ({ input }) => {
            const createdFragment = await prisma.fragment.create({
                data: {
                    ...input
                }
            });
            return createdFragment;
        }),
})