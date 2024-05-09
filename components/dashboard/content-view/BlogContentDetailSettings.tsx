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

export default function BlogContentDetailSettings({
  userId,
  blogDetailSettingData,
}: {
  userId: string | undefined;
  blogDetailSettingData: any;
}) {
  const { name, bio, x_id, website, google_adsense } = blogDetailSettingData;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogSettingsFormSchemaType>({
    resolver: zodResolver(blogSettingsFormSchema),
    defaultValues: { name, bio, x_id, website, google_adsense },
  });

  const BlogMetaDataUpdate = async (data: BlogSettingsFormSchemaType) => {
    const { name, bio, x_id, website, google_adsense } = data;
    try {
      const { error } = await supabaseClient
        .from("blog_meta_data")
        .update({ name, bio, x_id, website, google_adsense })
        .eq("id", userId!);
      if (error) throw error;
    } catch (err) {
      console.error("更新エラー:", err);
    }
  };

  const onSubmit = async (data: BlogSettingsFormSchemaType) => {
    try {
      await BlogMetaDataUpdate(data);

      return toast({
        title: "ブログの更新に成功しました🚀",
      });
    } catch (err) {
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
      >
        保存する
      </button>
    </form>
  );
}
