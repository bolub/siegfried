import React from "react";
import { Navbar } from "@/containers/home-page/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/routes";

export const HomePage = () => {
  return (
    <>
      <Navbar />

      <main className="mt-16 md:mt-32">
        <header className="container mx-auto w-full">
          <div className="max-w-xl">
            <h1 className="font-mono text-[56px] font-bold leading-[60px]">
              Create and sign documents easily
            </h1>
            <p className="mt-10 text-lg">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more users. Trusted by over 4,000
              startups.
            </p>

            <Button asChild size="lg" className="mt-14">
              <Link href={routes.login()}>Get Started</Link>
            </Button>
          </div>
        </header>
      </main>
    </>
  );
};
