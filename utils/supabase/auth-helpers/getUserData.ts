import { cache } from "react";
import { supabaseClient } from "../ssr/supabaseClientInit";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

//supabase client
export const getUserAllData = cache(async (domain: string) => {
  const { data: userData, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("domain", domain);

  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }

  return userData[0];
});

//auth-helpers
export const getDomainAndTemplateIdAndProfileImageUrl = async (
  supabase: SupabaseClient,
  id: string
) => {
  const { data: userData } = await supabase
    .from("users")
    .select("domain, template_id, user_profile_image_url")
    .eq("id", id)
    .single();

  return userData;
};

//all domain get
