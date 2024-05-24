import { ReactNode } from "react";
import SocialIcon from "./SocialIcon";
import AvatarIcon from "./AvatarIcon";

interface BlogMetaData {
  name: string;
  author: string;
  x_id: string;
  website: string;
}

interface Props {
  children: ReactNode;
  blogMetaData: BlogMetaData | null;
  profileImageUrl: string;
}

export default async function AuthorLayout({
  children,
  blogMetaData,
  profileImageUrl,
}: Props) {
  const { name = "", author = "", x_id = "/", website = "/" } = blogMetaData!;

  const safeName = name || "デフォルト名";
  const safeAuthor = author || name;
  const safeX_id = x_id || "/";
  const safeWebsite = website || "/";

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-5 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            <AvatarIcon
              src={profileImageUrl}
              alt={author}
              nameFallback="avatar icon"
              className="w-32 h-32"
            />
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
              {safeAuthor}
            </h3>
            <div className="flex space-x-3 pt-2">
              <SocialIcon href={safeX_id} type="twitter" />
              <SocialIcon href={safeWebsite} type="link" />
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
