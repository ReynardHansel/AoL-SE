import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { BackgroundGradientAnimation } from "./_components/ui/background-gradient-animation";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <BackgroundGradientAnimation>
      <div className="text-white">
        <p>Hello there</p>
      </div>
    </BackgroundGradientAnimation>
  );
}
