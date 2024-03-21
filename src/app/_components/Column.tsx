import { Task } from "@prisma/client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { api } from "~/trpc/server";
import { VscAccount } from "react-icons/vsc";
import { useDroppable } from "@dnd-kit/core";

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

export default async function Column({ title, columnId }: ColumnProps) {
  // console.log(tasks);
  const tasks = await api.kanban.getTasks(columnId);
  const { setNodeRef } = useDroppable({
    id: columnId.toString(),
  });

  const bgColorClass = columnIdToBgColor[columnId] || "bg-gray-500";

  return (
    <div ref={setNodeRef} className="group flex flex-col gap-4 text-white">
      <h1 className="font-bold">{title}</h1>
      <div
        className={`-mt-2 h-1 w-1/2 rounded ${bgColorClass} transition-all duration-300 group-hover:w-3/4`}
      ></div>
      {(await tasks).map((task) => {
        return (
          <Card
            className="cursor-pointer bg-transparent text-white"
            key={task.id}
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
      })}
    </div>
  );
}

// function TaskCard() {}
