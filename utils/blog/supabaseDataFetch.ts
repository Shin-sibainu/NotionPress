import { SupabaseClient } from "@supabase/supabase-js";

export default async function getUserAllData(
  supabase: SupabaseClient,
  userId: string
) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId);

    return data;
  } catch (err) {
    return null;
  }
}

export const getUserIdFromDomain = async (
  supabase: SupabaseClient,
  domain: string
) => {
  const { data: userData, error } = await supabase
    .from("users")
    .select("id")
    .eq("domain", domain)
    .single();

  if (error || !userData) {
    console.error("Error fetching user data:", error?.message);
    return null;
  }

  return userData.id;
};

export const getBlogDetailSettingData = async (
  supabase: SupabaseClient,
  userId: string
) => {
  const { data: blogDetailSettingData, error } = await supabase
    .from("blog_meta_data")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !blogDetailSettingData) {
    console.error("Error fetching blog details:", error?.message);
    return null;
  }

  return blogDetailSettingData;
};
