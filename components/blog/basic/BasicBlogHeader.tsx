"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function BasicBlogHeader({ domain }: { domain: string }) {
  const { setTheme } = useTheme();

  return (
    <header className="py-5">
      <div className="flex items-center gap-5">
        <Link href={`/basic/${domain}`} className="font-bold md:text-3xl">
          ShinCode
        </Link>
        <nav>
          <ul className="flex items-center gap-5">
            <li>
              <Link
                href={`/basic/${domain}`}
                className={`hover:text-muted-foreground duration-300`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={`/basic/${domain}/posts/page/1`}
                className={`hover:text-muted-foreground duration-300`}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href={`/basic/${domain}/tags`}
                className={`hover:text-muted-foreground duration-300`}
              >
                Tags
              </Link>
            </li>
          </ul>
        </nav>

        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
