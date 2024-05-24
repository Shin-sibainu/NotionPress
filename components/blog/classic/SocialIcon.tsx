import { Icons } from "@/lib/Icons";
import Link from "next/link";

interface SocialIconProps {
  type: keyof typeof Icons;
  href: string;
  size?: "sm" | "md" | "lg";
}

export default function SocialIcon({
  type,
  href,
  size = "sm",
}: SocialIconProps) {
  const IconComponent = Icons[type];

  if (!IconComponent) {
    return <div>Icon not found</div>;
  }

  const sizeClasses = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
  };

  const textSize = sizeClasses[size] || sizeClasses["sm"];

  return (
    <Link
      className={`${textSize} text-gray-500 transition hover:text-gray-600`}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <IconComponent />
    </Link>
  );
}
