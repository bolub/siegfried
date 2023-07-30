import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import { GoogleIcon } from "@/containers/Login/GoogleIcon";

export const LoginPage = () => {
  const handleSignIn = () => {
    void signIn("google");
  };

  return (
    <div className="flex h-screen w-full">
      <div className="m-auto flex w-full max-w-[360px] flex-col justify-center text-center">
        <Logo className="mx-auto" />

        <h1 className="mt-14 text-center text-[28px] font-bold">Welcome</h1>
        <p className="mx-auto mt-11 max-w-[308px] text-center text-base">
          Welcome back! Login or signup with your google account
        </p>

        <Button
          size="lg"
          className="mt-16 w-full bg-white"
          variant="outline"
          onClick={handleSignIn}
        >
          <GoogleIcon className="mr-[10px]" />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};
