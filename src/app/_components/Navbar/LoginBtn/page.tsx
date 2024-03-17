"use client";
import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function LoginButton() {
  return (
    <Button
      onClick={() => void signIn()}
      variant="default"
      size="lg"
      className="border bg-transparent hover:bg-white hover:text-black"
    >
      <p className="text-base">Log In</p>
    </Button>
    // <button onClick={() => void signIn()}>

    // </button>
  );
}
