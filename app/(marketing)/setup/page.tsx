import SetupStepComponent from "@/components/marketing/setup/setup-step-component";
import { supabaseServer } from "@/utils/supabase/auth-helpers/supabaseServer";

export default async function SetupPage() {
  const supabase = supabaseServer();

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  return (
    <div className="container max-w-[60rem]">
      <div className="py-10 space-y-3">
        <SetupStepComponent user={user} />
      </div>
    </div>
  );
}
