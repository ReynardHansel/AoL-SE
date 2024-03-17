"use client";
import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function LoginButton() {
  return (
    <Button
      onClick={() => void signOut()}
      variant="default"
      size="lg"
      className="border bg-transparent hover:bg-white hover:text-black"
    >
      <p className="text-base">Log Out</p>
    </Button>
    // <button onClick={() => void signIn()}>

    // </button>
  );
}
