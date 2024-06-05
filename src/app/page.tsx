import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { BackgroundGradientAnimation } from "./_components/ui/background-gradient-animation";
import Column from "./_components/Column";
import { Navbar } from "./_components/Navbar/page";
import DndContextContainer from "./_components/DndContextContainer";
import SessionProvider from "./_components/SessionProvider";

export default async function Home() {
  const columns = api.kanban.getColumn();

  const session = await getServerAuthSession();
  const user = session?.user;
  // console.log(user?.id);

  return (
    <>
      <Navbar />
      <BackgroundGradientAnimation
        className="absolute z-10 flex max-w-full gap-16"
        containerClassName="flex items-center justify-center"
      >
        <DndContextContainer>
          {(await columns).map((column) => {
            return (
              <SessionProvider key={column.id} session={session}>
                <Column
                  key={column.id}
                  title={column.title}
                  columnId={column.id}
                />
              </SessionProvider>
            );
          })}
        </DndContextContainer>
      </BackgroundGradientAnimation>
    </>
  );
}

// export async function adminStatus() {
//   const session = await getServerAuthSession();
//   const user = session?.user;
//   console.log(user?.id);
//   const userAdmin = api.kanban.getUserAdminStatus({ userId: user!.id });
// console.log(userAdmin);
// console.log({ userAdmin });

//   //? The code below is to check if the user is an admin. This is because getUserAdminStatus returns a promise, not a value
//   api.kanban.getUserAdminStatus({ userId: user!.id }).then((userAdmin) => {
// console.log({ userAdmin });
//     return userAdmin;
//   });
// }
