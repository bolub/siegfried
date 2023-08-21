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
import { NextSeo } from "next-seo";

interface AppshellProps {
  children: ReactNode;
  title: string;
  description?: string;
}

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

const NavList = () => {
  const router = useRouter();

  return (
    <>
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
    </>
  );
};

export const Appshell: FC<AppshellProps> = ({
  children,
  title,
  description,
}) => {
  const { data } = useSession();

  const handleLogout = () => {
    void signOut();
  };

  return (
    <>
      <NextSeo title={title} description={description} />

      <nav className="w-full border-b">
        <div className="flex h-16 items-center bg-white md:h-[94px]">
          <div className="container mx-auto flex items-center">
            <Link href={routes.dashboard()}>
              <Logo />
            </Link>

            <ul className="mx-auto hidden space-x-4 md:flex">
              <NavList />
            </ul>

            <DropdownMenu>
              <DropdownMenuTrigger className="ml-auto md:ml-0">
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
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href={routes.home()}>Back to home</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <ul className="container mx-auto flex space-x-4 border-t bg-white py-4 md:hidden">
          <NavList />
        </ul>
      </nav>

      <div className="container mx-auto mb-28 mt-8 w-full md:mt-16">
        {children}
      </div>
    </>
  );
};
