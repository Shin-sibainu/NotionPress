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
import { User } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

export default function AvatarSetting({
  user,
  userData,
}: {
  user: User | null;
  userData: { domain: string; template_id: number } | null;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  let blogTemplateName;
  const domain = userData?.domain;
  const templateId = userData?.template_id;

  switch (templateId) {
    case 1:
      blogTemplateName = "basic";
      break;
    case 2:
      blogTemplateName = "classic";
      break;
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={user?.user_metadata.avatar_url}
            alt="profile_icon"
          />
          <AvatarFallback>{user?.user_metadata.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="ml-2">設定</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Link
            href={`/${domain}/dashboard/blog`}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
          >
            ダッシュボード
          </Link>
          <Link
            href={`/${blogTemplateName}/${domain}`}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
          >
            公開中のブログ
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
          >
            ログアウト
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
