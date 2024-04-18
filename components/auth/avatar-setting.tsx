"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export default function AvatarSetting({ user }: { user: User | null }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    // <button
    //   className={cn(buttonVariants({ variant: "secondary" }))}
    //   onClick={handleSignOut}
    // >
    //   ログアウト
    // </button>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.user_metadata.avatar_url} alt="@shadcn" />
          <AvatarFallback>{user?.user_metadata.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>設定</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>
          <Link href={`domain/dashboard`}>ダッシュボード</Link>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          <Link href={`domain/dashboard`}>公開中のブログ</Link>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>
          <button onClick={handleSignOut}>ログアウト</button>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
