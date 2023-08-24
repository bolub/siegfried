import { cn } from "@/lib/utils";
import React, { type ComponentProps, type FC } from "react";
import LogoBlack from "public/logo.svg?url";
import Image from "next/image";

export const Logo: FC<ComponentProps<"span">> = (props) => {
  const { className, ...otherSpanProps } = props;

  return (
    <>
      <span className={cn([className])} {...otherSpanProps}>
        <Image src={LogoBlack} alt="Siegfried" className="w-[88px]" />
      </span>
    </>
  );
};
