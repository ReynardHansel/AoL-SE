import { getServerAuthSession } from "~/server/auth";
import LoginButton from "./LoginBtn/page";
import LogoutButton from "./LogoutBtn/page";

export async function Navbar() {
  const session = await getServerAuthSession();
  const user = session?.user;

  return (
    <nav className="bg-nav-bg sticky z-50 flex items-center justify-between border-b px-11 py-3 text-white">
      {/* <h1>This is the navbar</h1> */}

      {user == null ? (
        <h1>You are not logged in</h1>
      ) : (
        <h1>
          Welcome: <strong>{user.name}</strong>
        </h1>
      )}

      {user == null ? <LoginButton /> : <LogoutButton />}
    </nav>
  );
}
