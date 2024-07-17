import React from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface Template {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  variant: "free" | "price";
  slug: string;
}

const templates: Template[] = [
  {
    id: 1,
    title: "ベーシック",
    description: "無料で使えるブログテンプレートです。",
    image: "/images/blog/blog-post-1.jpg",
    price: "無料",
    variant: "free",
    slug: "basic/TestBlog",
  },
  {
    id: 2,
    title: "クラシック",
    description: "より凝ったブログテンプレートを使いたい方向けです。",
    image: "/images/blog/blog-post-1.jpg",
    price: "有料",
    variant: "price",
    slug: "classic/TestBlog",
  },
];

const TemplateCard: React.FC<{ template: Template }> = ({ template }) => (
  <div className="card rounded-md shadow-md p-4 space-y-2 border">
    <Image
      src={template.image}
      width={470}
      height={340}
      priority
      alt={template.title}
      className="mx-auto"
    />
    <div className="flex justify-between items-center py-2">
      <h3 className="font-bold">{template.title}</h3>
      <Badge variant={template.variant}>{template.price}</Badge>
    </div>
    <p className="text-muted-foreground text-sm">{template.description}</p>
    <Link
      href={`${process.env.NEXT_PUBLIC_BASE_URL}/${template.slug}`}
      className="text-sm underline"
      target="_blank"
      rel="noreferrer"
    >
      サンプルを見る
    </Link>
  </div>
);

const BlogTemplatesPage: React.FC = () => (
  <div className="container py-12 space-y-4">
    <h3 className="font-medium text-3xl">NotionBlogテンプレート一覧</h3>
    <p className="text-muted-foreground">クリックしてご確認ください。</p>
    <div className="grid md:grid-cols-2 gap-5">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </div>
  </div>
);

export default BlogTemplatesPage;
