import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

// const fileSchema = z
//   .any()
//   .optional()
//   .refine(
//     (file) =>
//       file == null || (file instanceof File && file.size <= MAX_FILE_SIZE),
//     {
//       message: "画像サイズは2MB以下にしてください。",
//     }
//   )
//   .refine(
//     (file) =>
//       file == null ||
//       (file instanceof File && ALLOWED_FILE_TYPES.includes(file.type)),
//     {
//       message: "PNGまたはJPG形式のファイルを選択してください。",
//     }
//   );

// const fileSchema = z
//   .instanceof(File, { message: "ファイルが選択されていません" })
//   .optional()
//   .refine(
//     (file) => !file || file.size <= MAX_FILE_SIZE,
//     "画像サイズは2MB以下にしてください。"
//   )
//   .refine(
//     (file) => !file || ALLOWED_FILE_TYPES.includes(file.type),
//     "PNGまたはJPG形式のファイルを選択してください。"
//   );

const fileSchema = z.any().optional();

export const blogSettingsFormSchema = z.object({
  name: z
    .string()
    .max(15, { message: "ブログ名は15文字以内で入力してください。" }),
  bio: z
    .string()
    .max(250, { message: "自己紹介文は250文字以内で入力してください。" }),
  author: z
    .string()
    .max(10, { message: "執筆者名は10文字以内で入力してください。" }),
  profileImage: fileSchema,
  x_id: z.string(),
  website: z.string(),
  google_adsense: z.string(),
});

export type BlogSettingsFormSchemaType = z.infer<typeof blogSettingsFormSchema>;
