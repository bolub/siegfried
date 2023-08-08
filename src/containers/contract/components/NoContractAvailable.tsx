import { Button } from "@/components/ui/button";
import { routes } from "@/routes";
import Link from "next/link";
import React from "react";

export const NoContractDataAvailable = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center border">
      <p className="font-mono text-lg font-bold">Contract data not available</p>

      <Link href={routes.home()}>
        <Button className="mt-6">Go to homepage</Button>
      </Link>
    </div>
  );
};
