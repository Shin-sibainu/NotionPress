import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface AvatarProps {
  src: string;
  alt: string;
  nameFallback: string;
  className?: string;
}

const AvatarIcon: React.FC<AvatarProps> = ({
  src,
  alt,
  nameFallback,
  className,
}) => {
  return (
    <Avatar className={`inline-block ${className}`}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{nameFallback}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarIcon;
