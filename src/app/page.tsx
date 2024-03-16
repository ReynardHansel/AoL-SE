import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { BackgroundGradientAnimation } from "./_components/ui/background-gradient-animation";
import Column from "./_components/Column";

export default async function Home() {
  const session = getServerAuthSession();
  const columns = api.kanban.getColumn();

  return (
    <BackgroundGradientAnimation
      className="absolute z-10 flex items-center justify-center text-white"
      containerClassName="flex items-center justify-center"
    >
      {(await columns).map((column) => {
        return <Column key={column.id} title={column.title} tasks={null} />;
      })}
    </BackgroundGradientAnimation>
  );
}
