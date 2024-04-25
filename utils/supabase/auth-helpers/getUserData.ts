import { supabaseClient } from "../ssr/supabaseClientInit";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

//supabase client
export const getUserAllData = async (domain: string) => {
  const { data: userData, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("domain", domain);

  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }

  return userData[0];
};

//auth-helpers
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
