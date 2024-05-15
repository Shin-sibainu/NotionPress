import { supabaseClient } from "../supabase/ssr/supabaseClientInit";

export const validateNotionTokenCredentials = async (
  integrationToken: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/setup/validateNotionTokenCredentials`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ integrationToken }),
    }
  );

  const data = await response.json();

  if (!data.isValid) {
    return {
      isValid: data.isValid,
      message: data.message,
      notionToken: data.token,
    };
  } else {
    return {
      isValid: data.isValid,
      message: data.message,
    };
  }
};

export const validateNotionIdredentials = async (
  notionToken: string,
  notionId: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/setup/validateNotionIdCredentials`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notionToken, notionId }),
    }
  );

  const data = await response.json();

  if (!data.isValid) {
    return {
      isValid: data.isValid,
      message: data.message,
    };
  } else {
    return {
      isValid: data.isValid,
      message: data.message,
    };
  }
};

export const checkIsDomainValid = async (domain: string) => {
  try {
    const { data, error } = await supabaseClient
      .from("users")
      .select("domain")
      .eq("domain", domain)
      .maybeSingle();

    console.log(data);

    if (error) {
      throw error;
    }

    return data === null;
  } catch (err) {
    return false;
  }
};
