import { cn } from "@/lib/utils";
import React, { type ComponentProps, type FC } from "react";

export const Logo: FC<ComponentProps<"span">> = (props) => {
  const { className, ...otherSpanProps } = props;

  return (
    <span
      className={cn([
        "font-mono text-base font-bold uppercase text-primary-100",
        className,
      ])}
      {...otherSpanProps}
    >
      Siegfried
    </span>
  );
};
