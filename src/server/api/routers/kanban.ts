import { Priority } from "@prisma/client";
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

  getUserAdminStatus: protectedProcedure
    .input(z.union([z.object({ userId: z.string() }), z.undefined(), z.null()]))
    .query(async ({ ctx, input }) => {
      if (!input || !input.userId || input.userId == "") return;

      const user = await ctx.db.user.findUnique({
        where: { id: input.userId },
        select: { isAdmin: true },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user.isAdmin;
    }),

  getUsers: protectedProcedure.query(async ({ ctx }) => {
    try {
      const users = await ctx.db.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          image: true,
          isAdmin: true,
          // Include other fields as needed
        },
      });

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }),

  addTask: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        assigneeId: z.string(),
        deadline: z.date(),
        priority: z.enum([Priority.high, Priority.medium, Priority.normal])
      }),
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const newTask = await ctx.db.task.create({
          data: {
            title: input.title,
            description: input.description,
            userId: input.assigneeId,
            columnId: 1, // Default column ID
            Deadline: input.deadline,
            priority: input.priority,
          },
        });

        return newTask;
        
      } catch (error) {
        console.error("Error adding task:", error);
        throw new Error("Failed to add task");
      }
    }),
});
