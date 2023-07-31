import React, { type ReactNode, type FC } from "react";
import { Logo } from "@/components/Logo";
import clsx from "clsx";
import { routes } from "@/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
              //  src={data?.user.image ?? ""}
              />

              <AvatarFallback>
                Bolu Test
                {/* {data?.user.name} */}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <div className="py-10">{children}</div>
    </>
  );
};
