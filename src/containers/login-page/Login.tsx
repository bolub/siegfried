import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import { GoogleIcon } from "@/containers/login-page/GoogleIcon";
import Link from "next/link";
import { routes } from "@/routes";

export const LoginPage = () => {
  const handleSignIn = () => {
    void signIn("google");
  };

  return (
    <div
      className="flex h-screen w-full"
      style={{
        backgroundImage: 'url("/lines.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container m-auto flex w-full max-w-[360px] flex-col justify-center text-center">
        <Link href={routes.home()}>
          <Logo className="mx-auto" />
        </Link>

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
