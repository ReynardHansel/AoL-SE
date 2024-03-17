import { Task } from "@prisma/client";
import { Card, CardContent, CardHeader } from "~/components/ui/card";

type Tasks = Task[];

type ColumnProps = {
  title: string;
  tasks: Tasks;
};
const Column = ({ title, tasks }: ColumnProps) => {
  return (
    <div className="group flex flex-col gap-4 text-white">
      <h1 className="font-bold">{title}</h1>
      <div className="-mt-2 h-1 w-1/2 rounded bg-red-500 transition-all duration-300 group-hover:w-3/4"></div>
      <Card className="cursor-pointer bg-transparent text-white">
        {/* <CardHeader className="font-bold">{title}</CardHeader> */}
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
