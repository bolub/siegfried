import React, { type ReactNode, type FC } from "react";
import { Logo } from "@/components/Logo";
import clsx from "clsx";
import { routes } from "@/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
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
    href: routes.contracts.all(),
  },
];

interface AppshellProps {
  children: ReactNode;
}

export const Appshell: FC<AppshellProps> = ({ children }) => {
  const router = useRouter();
  const { data } = useSession();

  const handleLogout = () => {
    void signOut();
  };

  return (
    <>
      <nav className="flex h-[94px] w-full items-center border-b bg-white">
        <div className="container mx-auto flex items-center">
          <Logo />

          <ul className="mx-auto flex space-x-4">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "flex h-7 items-center justify-center rounded-lg px-3 py-[20px] text-sm",
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
                <AvatarImage src={data?.user.image ?? ""} />

                <AvatarFallback>{data?.user.name}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <div className="container mx-auto mt-16 w-full">{children}</div>
    </>
  );
};
