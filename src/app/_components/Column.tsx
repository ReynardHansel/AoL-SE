"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { VscAccount } from "react-icons/vsc";

import { useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";

import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";

type ColumnProps = {
  title: string;
  columnId: number;
};

const columnIdToBgColor: Record<number, string> = {
  1: "bg-red-500",
  2: "bg-yellow-500",
  3: "bg-blue-500",
  4: "bg-green-500",
  // Add more mappings as needed
};

export default function Column({ title, columnId }: ColumnProps) {
  const { data: session, status } = useSession();
  // console.log(session?.user.id);
  // console.log({status});

  const tasks = api.kanban.getTasks2.useQuery({ columnId: columnId });
  // console.log(tasks);

  let userAdmin
  if (session && session.user){
    userAdmin = api.kanban.getUserAdminStatus.useQuery({ userId: session?.user.id || '' });
    // console.log(userAdmin.data);
  }

  const { isOver, setNodeRef } = useDroppable({
    id: columnId.toString(),
  });

  const style = {
    //? To check the position of the draggable element
    // color: isOver ? "green" : undefined,
  };

  const bgColorClass = columnIdToBgColor[columnId] || "bg-gray-500";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group flex flex-col gap-4 text-white pointer-events-auto"
    >
      <h1 className="font-bold">{title}</h1>
      <div
        className={`-mt-2 h-1 w-1/2 rounded ${bgColorClass} transition-all duration-300 group-hover:w-3/4`}
      ></div>
      {/* <SortableContext
        items={tasks.data?.map(task => task.id.toString()) || []}
        strategy={verticalListSortingStrategy}
      > */}
      {tasks.data?.map((task, index) => {
        return (
          // <SortableItem key={task.id} id={task.id.toString()}>
          <TaskCard key={task.id} task={task} index={index} />
          // </SortableItem>
        );
      })}
      {columnId === 1 && userAdmin?.data && (
        <p className="-mt-1 w-fit cursor-pointer px-1 text-sm text-gray-400 hover:text-gray-200">
          + Add Task
        </p>
      )}
      {/* </SortableContext> */}
    </div>
  );
}

function TaskCard({ task, index }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id.toString(),
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  // console.log("Task index: ", index);

  return (
    <Card
      className="cursor-pointer bg-transparent text-white"
      key={task.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <CardHeader className="font-bold">{task.title}</CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <p className="text-sm">Assigned to: </p>

          {task.user ? (
            <div className="flex items-center justify-center gap-2">
              <Avatar>
                <AvatarImage src={task.user?.image} />
                <AvatarFallback>
                  <VscAccount />
                </AvatarFallback>
              </Avatar>
              {/* <p className="text-sm">{task.user?.name}</p> */}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <VscAccount />
              <p>-</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
