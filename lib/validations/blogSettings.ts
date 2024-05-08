import { z } from "zod";

export const blogSettingsFormSchema = z.object({
  name: z
    .string()
    .max(15, { message: "ブログ名は15文字以内で入力してください。" }),
  bio: z
    .string()
    .max(250, { message: "自己紹介文は250文字以内で入力してください。" }),
  x_id: z.string(),
  website: z.string(),
  google_adsense: z.string(),
});

export type BlogSettingsFormSchemaType = z.infer<typeof blogSettingsFormSchema>;
