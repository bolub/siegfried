import React from "react";
import { Navbar } from "@/containers/Home/Navbar";

export const HomePage = () => {
  return (
    <>
      <Navbar />

      <main className="mt-32">
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

            <button className="mt-14 rounded-lg bg-primary-100 px-[18px] py-[10px] text-base font-medium text-white">
              Get Started
            </button>
          </div>
        </header>
      </main>
    </>
  );
};