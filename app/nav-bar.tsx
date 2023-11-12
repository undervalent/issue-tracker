"use client";
import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from 'classnames';
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Issues", href: "/issues" },
];

export function NavBar() {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      classnames({
                        "text-zinc-900": link.href === currentPath,
                        "text-zinc-500": link.href !== currentPath,
                        "hover:text-zinc-800 transition-colors": true,
                      })
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            <ul>
              {status === "authenticated" && <li>
                <Link href="/api/auth/signout">Log out</Link>
              </li>}
              {status === "unauthenticated" && <li>
                <Link href="/api/auth/signin">Log in</Link>
              </li>}
            </ul></Box>
        </Flex>
      </Container>
    </nav>
  );
}
export default NavBar;
