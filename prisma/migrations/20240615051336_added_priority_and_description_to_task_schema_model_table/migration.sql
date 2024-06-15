-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('high', 'medium', 'normal');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "description" TEXT,
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'normal';
