import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export const getUserAllData = async (
  domain: string,
  supabase: SupabaseClient<Database>
) => {
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("domain", domain)
    .single();

  return userData;
};

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
