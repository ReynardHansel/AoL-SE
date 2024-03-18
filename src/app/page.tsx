import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { BackgroundGradientAnimation } from "./_components/ui/background-gradient-animation";
import Column from "./_components/Column";
import { Navbar } from "./_components/Navbar/page";

export default async function Home() {
  const session = getServerAuthSession();
  const columns = api.kanban.getColumn();

  return (
    <>
      <Navbar />
      <BackgroundGradientAnimation
        className="absolute z-10 flex max-w-full gap-16"
        containerClassName="flex items-center justify-center"
      >
        {(await columns).map((column) => {
          return (
            <Column key={column.id} title={column.title} columnId={column.id} />
          );
        })}
      </BackgroundGradientAnimation>
    </>
  );
}
