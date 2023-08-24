import { cn } from "@/lib/utils";
import React, { type ComponentProps, type FC } from "react";
import LogoBlack from "public/logo.svg?url";
import Image from "next/image";

export const Logo: FC<
  ComponentProps<"span"> & {
    type?: "text" | "logo";
  }
> = (props) => {
  const { className, type = "logo", ...otherSpanProps } = props;

  if (type === "text") {
    return (
      <span
        className={cn([
          "text-primary-100 font-mono text-base font-bold uppercase",
          className,
        ])}
        {...otherSpanProps}
      >
        Siegfried
      </span>
    );
  } else {
    return (
      <>
        <span className={cn([className])} {...otherSpanProps}>
          <Image src={LogoBlack} alt="Siegfried" className="w-[88px]" />
        </span>
      </>
    );
  }
};
