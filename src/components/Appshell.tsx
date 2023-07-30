import React, { type ReactNode, type FC } from "react";
import { Logo } from "@/components/Logo";
import clsx from "clsx";
import { routes } from "@/routes";
import Link from "next/link";
import { useRouter } from "next/router";

const navItems = [
  {
    label: "Dashboard",
    href: routes.dashboard(),
  },
  {
    label: "Contracts",
    href: routes.contracts(),
  },
];

interface AppshellProps {
  children: ReactNode;
}

export const Appshell: FC<AppshellProps> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <nav className="container mx-auto flex h-[94px] w-full items-center">
        <Logo />

        <ul className="mx-auto flex space-x-4">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={clsx(
                    "flex h-7 items-center justify-center rounded-lg px-3 py-[20px] text-[13px]",
                    {
                      "bg-[rgba(0,0,0,.08)] font-bold": isActive,
                      "font-medium": !isActive,
                    }
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="py-10">{children}</div>
    </>
  );
};
