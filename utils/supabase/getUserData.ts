import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export const getUserDomainAndTemplateIdData = async (
  supabase: SupabaseClient,
  id: string
) => {
  const { data: userData } = await supabase
    .from("users")
    .select("domain, template_id")
    .eq("id", id)
    .single();

  return userData;
};
