import AccountContentView from "@/components/dashboard/content-view/AccountContentView";
import BlogContentView from "@/components/dashboard/content-view/BlogContentView";
import HowToWriteBlogWithNotion from "@/components/dashboard/content-view/HowToWriteBlogWithNotion";
import Sidebar from "@/components/dashboard/Sidebar";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import { notFound, redirect } from "next/navigation";

export default async function DashBoardPage({
  params,
}: {
  params: { domain: string; section: string };
}) {
  const domain = params.domain;
  const section = params.section;
  const supabase = supabaseServer();

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (domain === "null" || domain === "undefined") {
    redirect("/setup");
  }

  if (!user) {
    redirect("/setup");
  }

  const renderSection = () => {
    switch (section) {
      case "blog":
        return <BlogContentView domain={domain} />;
      case "how-to-write-blog-with-notion":
        return <HowToWriteBlogWithNotion user={user} />;
      case "account":
        return <AccountContentView />;
      default:
        notFound();
    }
  };

  return (
    <div className="container py-6 md:py-14">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="md:w-1/5">
          <Sidebar domain={domain} section={section} />
        </div>
        <div className="md:w-4/5">{renderSection()}</div>
      </div>
    </div>
  );
}
