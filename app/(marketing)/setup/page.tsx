import SetupStepComponent from "@/components/marketing/setup/setup-step-component";
import getUserAllData from "@/utils/blog/supabaseDataFetch";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";
import { redirect } from "next/navigation";

export default async function SetupPage() {
  const supabase = supabaseServer();

  const { data } = await supabase.auth.getUser();
  const user = data.user;
  const userId = data.user?.id!;

  const userAllData = await getUserAllData(supabase, userId);
  const { domain } = userAllData![0];

  if (domain) {
    redirect(`/${domain}/dashboard/blog`);
  }

  return (
    <div className="container max-w-[60rem]">
      <div className="py-10 space-y-3">
        <SetupStepComponent user={user} />
      </div>
    </div>
  );
}
