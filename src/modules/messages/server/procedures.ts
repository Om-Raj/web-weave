import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        projectId: z
          .string()
          .min(1, { message: "Project ID is required" })
          .uuid({ message: "Project ID is invalid" }),
      }),
    )
    .query(async ({ input, ctx }) => {
      return await prisma.message.findMany({
        where: {
          projectId: input.projectId,
          project: {
            userId: ctx.auth.userId,
          },
        },
        include: {
          fragment: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    }),
  create: protectedProcedure
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
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const project = await prisma.project.findUnique({
        where: {
          id: input.projectId,
          userId: ctx.auth.userId,
        },
      });
      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }
      const createdMessage = await prisma.message.create({
        data: {
          projectId: project.id,
          role: "USER",
          type: "RESULT",
          content: input.value,
        },
      });
      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
          projectId: project.id,
        },
      });
      return createdMessage;
    }),
});
