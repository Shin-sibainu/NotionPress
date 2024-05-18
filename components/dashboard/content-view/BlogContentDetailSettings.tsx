"use client";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BlogSettingsFormSchemaType,
  blogSettingsFormSchema,
} from "@/lib/validations/blogSettings";
import { supabaseClient } from "@/utils/supabase/ssr/supabaseClientInit";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/lib/Icons";
import { useRouter } from "next/navigation";

//https://github.com/Shin-sibainu/mail-form-for-shincode-camp/blob/main/components/MailForm.tsx

export default function BlogContentDetailSettings({
  userId,
  blogDetailSettingData,
}: {
  userId: string | undefined;
  blogDetailSettingData: any;
}) {
  const { name, bio, x_id, website, google_adsense, user_profile_image_url } =
    blogDetailSettingData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogSettingsFormSchemaType>({
    resolver: zodResolver(blogSettingsFormSchema),
    defaultValues: { name, bio, x_id, website, google_adsense },
  });

  const router = useRouter();
  const [profileImageError, setProfileImageError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const BlogMetaDataUpdate = async (data: BlogSettingsFormSchemaType) => {
    const { name, bio, author, x_id, website, google_adsense } = data;
    try {
      const { error } = await supabaseClient
        .from("blog_meta_data")
        .update({ name, bio, author, x_id, website, google_adsense })
        .eq("id", userId!);
      if (error) throw error;
    } catch (err) {
      console.error("更新エラー:", err);
    }
  };

  const UploadProfileImageAndUpdateUser = async (
    file: File,
    userId: string
  ) => {
    if (!file) {
      return "ファイルが選択されていません。";
    }

    const allowedTypes = ["image/png", "image/jpeg"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      return "PNGまたはJPG形式のファイルを選択してください";
    }

    if (file.size > maxSize) {
      return "ファイルサイズは2MB以下にしてください";
    }

    const filePath = `profile-images/${userId}/${new Date().getTime()}-${
      file.name
    }`;
    const { error: uploadError } = await supabaseClient.storage
      .from("profile_image_bucket")
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      setIsLoading(false);
      return "ファイルのアップロードに失敗しました。";
    }

    const { data: imageUrl } = supabaseClient.storage
      .from("profile_image_bucket")
      .getPublicUrl(filePath);

    const { error: updateError } = await supabaseClient
      .from("users")
      .update({ user_profile_image_url: imageUrl.publicUrl })
      .eq("id", userId);

    if (updateError) {
      console.error(updateError);
      setIsLoading(false);
      return "プロフィール画像の更新に失敗しました。";
    }

    return null;
  };

  const onSubmit = async (data: BlogSettingsFormSchemaType) => {
    try {
      setIsLoading(true);
      await BlogMetaDataUpdate(data);

      if (data.profileImage && data.profileImage[0]) {
        const errorMessage = await UploadProfileImageAndUpdateUser(
          data.profileImage[0],
          userId!
        );
        if (errorMessage) {
          setProfileImageError(errorMessage);
          return toast({
            title: errorMessage,
            variant: "destructive",
          });
        }
      }

      setIsLoading(false);
      router.refresh();

      return toast({
        title: "ブログの更新に成功しました🚀",
      });
    } catch (err) {
      setIsLoading(false);
      return toast({
        title: "更新に失敗しました。",
        description: "もう一度お確かめください。",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="py-4">
        <div className="space-y-2">
          <span className="font-medium sm:text-xl text-lg">
            Notionブログの基本設定
          </span>

          <div>
            <Label className="font-normal">ブログ名</Label>
            <Input
              placeholder="NotionPressのブログ"
              className="mt-1"
              {...register("name")}
            />
            {errors.name && (
              <span className="inline-block text-red-500 font-medium mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <Label className="font-normal">自己紹介文</Label>
            <Textarea
              placeholder="こんにちは。ShinCodeです。WebエンジニアとしてNotionでブログ執筆活動をしています。"
              className="mt-1"
              {...register("bio")}
            />
            {errors.bio && (
              <span className="inline-block text-red-500 font-medium mt-1">
                {errors.bio.message}
              </span>
            )}
          </div>

          <div>
            <Label className="font-normal">ブログ執筆者名</Label>
            <Input
              placeholder="山田太郎"
              className="mt-1"
              {...register("author")}
            />
            {errors.author && (
              <span className="inline-block text-red-500 font-medium mt-1">
                {errors.author.message}
              </span>
            )}
          </div>

          <div className="pt-1 block">
            <Avatar className="border shadow w-14 h-14">
              <AvatarImage src={user_profile_image_url} alt="profile_icon" />
              <AvatarFallback>{name}</AvatarFallback>
            </Avatar>

            <div>
              <Label className="font-normal">プロフィール画像</Label>
              <Input
                className="mt-1 cursor-pointer"
                {...register("profileImage")}
                type="file"
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
            {profileImageError && (
              <span className="inline-block text-red-500 font-medium mt-1">
                {profileImageError}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="space-y-3">
          <span className="font-medium sm:text-xl text-lg">
            ブログの詳細カスタマイズ
          </span>

          <div>
            <Label className="font-normal">Xアカウントリンク</Label>
            <Input
              placeholder="https://twitter.com/notionpress"
              className="mt-1"
              {...register("x_id")}
            />
            {errors.x_id && (
              <span className="inline-block text-red-500 font-medium mt-1">
                {errors.x_id.message}
              </span>
            )}
          </div>

          <div>
            <Label className="font-normal">あなたのウェブサイト</Label>
            <Input
              placeholder="https://xxx.com"
              className="mt-1"
              {...register("website")}
            />
            {errors.website && (
              <span className="inline-block text-red-500 font-medium mt-1">
                {errors.website.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="space-y-3">
          <span className="font-medium sm:text-xl text-lg">ブログの収益化</span>

          <div>
            <Label className="font-normal">Googleアドセンスコード ?</Label>
            <Input
              placeholder="xxxxxxxxxxxx"
              className="mt-1"
              {...register("google_adsense")}
            />
            {errors.google_adsense && (
              <span className="inline-block text-red-500 font-medium mt-1">
                {errors.google_adsense.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className={cn(buttonVariants({ variant: "default" }))}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="w-4 h-4 animate-spin" />
        ) : (
          "保存する"
        )}
      </button>
    </form>
  );
}
