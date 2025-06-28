import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { generateSlug } from "random-word-slugs"

export const projectsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        return await prisma.project.findMany({
            orderBy: {
                createdAt: "desc",
            }
        });
    }),
    create: baseProcedure
        .input(
            z.object({
                value: z.string()
                    .min(1, { message: "Value is required" })
                    .max(1000, { message: "Value is too long" }),
            })
        )
        .mutation(async ({ input }) => {
            const createdProject = await prisma.project.create({
                data: {
                    name: generateSlug(2, {
                        format: "kebab",
                    }),
                    messages: {
                        create: {
                            role: "USER",
                            type: "RESULT",
                            content: input.value,
                        }
                    }
                }
            });
            await inngest.send({
                name: "code-agent/run",
                data: {
                    value: input.value,
                    projectId: createdProject.id,
                }
            });
            return createdProject;
        }),
});