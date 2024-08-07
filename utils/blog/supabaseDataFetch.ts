import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";

export default async function getUserAllData(
  supabase: SupabaseClient,
  userId: string
) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    return data;
  } catch (err) {
    return null;
  }
}

export const getUserIdFromDomain = cache(
  async (supabase: SupabaseClient, domain: string) => {
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
  }
);

export const getUserProfileImageUrlFromDomain = async (
  supabase: SupabaseClient,
  domain: string
) => {
  const { data: userProfileImageUrl, error } = await supabase
    .from("users")
    .select("user_profile_image_url")
    .eq("domain", domain)
    .single();

  if (error || !userProfileImageUrl) {
    console.error("Error fetching user data:", error?.message);
    return null;
  }

  return userProfileImageUrl;
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
