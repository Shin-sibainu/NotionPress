import { supabaseClient } from "../ssr/supabaseClientInit";

export const getUserAllData = async (domain: string) => {
  const { data: userData } = await supabaseClient
    .from("users")
    .select("*")
    .eq("domain", domain)
    .single();

  return userData;
};

export const getUserDomainAndTemplateIdData = async (domain: string) => {
  const { data: userData } = await supabaseClient
    .from("users")
    .select("domain, template_id")
    .eq("domain", domain)
    .single();

  return userData;
};
