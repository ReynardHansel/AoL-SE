import { Task } from "@prisma/client";

type Tasks = Task[]

type ColumnProps = {
  title: string;
  tasks: Tasks
};

const Column = ({ title, tasks }: ColumnProps) => {
  return (
    <div className="">
      <h2>{title}</h2>
      <div className="">
        {/* {tasks.map((task) => (
          <div key={task.id} className="task">
            {task.title}
          </div>
        ))} */}
        <h1>Column works</h1>
      </div>
    </div>
  );
};

export default Column;
