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
});
