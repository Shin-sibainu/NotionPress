"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound, redirect, useRouter } from "next/navigation";
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
import { templateIdToTemplateName } from "@/utils/switch-templateId-to-templateName";

export default function AvatarSetting({
  user,
  userData,
}: {
  user: User | null;
  userData: {
    domain: string;
    template_id: number;
    user_profile_image_url: string;
  } | null;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  if (!userData) {
    return;
  }

  const { domain, template_id, user_profile_image_url } = userData!;

  let blogTemplateName = templateIdToTemplateName(template_id);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  let profileImageUrlChange =
    domain === null ? user?.user_metadata.picture : user_profile_image_url;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={profileImageUrlChange} alt="profile_icon" />
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
            href={
              blogTemplateName ? `/${blogTemplateName}/${domain}` : "/setup"
            }
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
