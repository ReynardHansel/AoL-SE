import { getServerAuthSession } from "~/server/auth";
import LoginButton from "./LoginBtn/page";
import LogoutButton from "./LogoutBtn/page";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { VscAccount } from "react-icons/vsc";

export async function Navbar() {
  const session = await getServerAuthSession();
  const user = session?.user;
  // console.log(user?.image);

  return (
    <nav className="fixed w-full z-50 flex items-center justify-between border-b bg-nav-bg px-11 py-3 text-white">
      {/* <h1>This is the navbar</h1> */}

      {user == null ? (
        <h1>You are not logged in</h1>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <h1>
            Welcome: <strong>{user.name}</strong>
          </h1>
          <Avatar>
            <AvatarImage src={user.image || ''} />
            <AvatarFallback>
              <VscAccount />
            </AvatarFallback>
          </Avatar>
        </div>
      )}

      {user == null ? <LoginButton /> : <LogoutButton />}
    </nav>
  );
}
