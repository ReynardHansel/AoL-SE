import { Task } from "@prisma/client";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

type Tasks = Task[];

type ColumnProps = {
  title: string;
  tasks: Tasks;
};

const Column = ({ title, tasks }: ColumnProps) => {
  return (
    <div className="flex flex-col gap-4 text-white">
      <h1 className="font-bold">{title}</h1>
      <Card className="cursor-pointer bg-transparent text-white">
        <CardHeader className="font-bold">{title}</CardHeader>
        <CardContent>
          {/* {tasks.map((task) => (
            <div key={task.id} className="task">
              {task.title}
            </div>
          ))} */}
          <h1>Column works</h1>
        </CardContent>
      </Card>
    </div>
  );
};

export default Column;
