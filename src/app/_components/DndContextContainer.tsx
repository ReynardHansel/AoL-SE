"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { api } from "~/trpc/react";

type DndContextContainerProps = {
  children: React.ReactNode;
  // onDragEnd?(event: DragEndEvent): void;
};

export default function DndContextContainer({
  children,
  // onDragEnd,
}: DndContextContainerProps) {
  const [columns, setColumns] = useState([]);

  const moveTask = api.kanban.moveTask.useMutation({
    onSuccess: (updatedTask) => {
      console.log("Task moved successfully", updatedTask);
    },
    onError: (error) => {
      console.error("Error moving task", error);
    },
  });

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log("Drag ended", event);
    console.log("active", active);
    console.log("active id", active.id);
    console.log("over", over);
    console.log("over id", over?.id);

    if (active.id !== over?.id) {
      moveTask.mutate({
        activeTaskId: active.id as string,
        overColumnId: parseInt(over?.id) as number, //* It's a string (idk why)
      });
    }
  }

  return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>;
}
