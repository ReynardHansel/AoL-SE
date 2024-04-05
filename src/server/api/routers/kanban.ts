import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

// import { Prisma } from "@prisma/client";

export const kanbanRouter = createTRPCRouter({
  getColumn: publicProcedure.query(async ({ ctx }) => {
    try {
      const columns = await ctx.db.column.findMany({
        include: {
          Task: true,
        },
      });

      return columns;
    } catch (error) {
      console.error("Error fetching columns:", error);
      throw new Error("Failed to fetch columns");
    }
  }),

  getTasks: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const tasks = await ctx.db.task.findMany({
      where: { columnId: input },
      include: { user: true },
    });

    return tasks;
  }),

  getTasks2: publicProcedure
    .input(z.object({ columnId: z.number() }))
    .query(async ({ input: { columnId }, ctx }) => {
      try {
        const tasks = await ctx.db.task.findMany({
          where: { columnId: columnId },
          include: { user: true },
        });

        return tasks;
      } catch (error) {
        throw new Error("Failed to fetch tasks");
      }
    }),

  moveTask: protectedProcedure
    .input(z.object({ activeTaskId: z.string(), overColumnId: z.number() }))
    .mutation(async ({ input: { activeTaskId, overColumnId }, ctx }) => {
      try {
        // Update the task's columnId in the database
        const updatedTask = await ctx.db.task.update({
          where: { id: activeTaskId },
          data: { columnId: overColumnId },
        });

        return updatedTask;
      } catch (error) {
        console.error("Error moving task:", error);
        throw new Error("Failed to move task");
      }
    }),
});
