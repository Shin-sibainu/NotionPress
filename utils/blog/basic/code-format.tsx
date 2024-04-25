import Link from "next/link";
import { ClassAttributes, HTMLAttributes } from "react";
import { ExtraProps } from "react-markdown";

// export const H2 = ({
//   node,
//   children,
// }: ClassAttributes<HTMLHeadingElement> &
//   HTMLAttributes<HTMLHeadingElement> &
//   ExtraProps) => {
//   const title =
//     node?.children[0] && "value" in node?.children[0]
//       ? node?.children[0].value
//       : "";
//   return <h2 className="font-bold text-2xl">{children}</h2>;
// };

//https://tailwind-md-base.netlify.app/
//https://www.newt.so/docs/tutorials/customize-code-block-using-react-markdown

export const H1 = ({
  children,
}: ClassAttributes<HTMLHeadingElement> &
  HTMLAttributes<HTMLHeadingElement> &
  ExtraProps) => {
  return <h1 className="font-bold text-3xl mt-4 mb-2">{children}</h1>;
};

export const H2 = ({
  children,
}: ClassAttributes<HTMLHeadingElement> &
  HTMLAttributes<HTMLHeadingElement> &
  ExtraProps) => {
  return <h2 className="font-bold text-2xl mt-4 mb-2">{children}</h2>;
};

export const H3 = ({
  children,
}: ClassAttributes<HTMLHeadingElement> &
  HTMLAttributes<HTMLHeadingElement> &
  ExtraProps) => {
  return <h3 className="font-bold text-xl mt-3 mb-1">{children}</h3>;
};

export const H4 = ({
  children,
}: ClassAttributes<HTMLHeadingElement> &
  HTMLAttributes<HTMLHeadingElement> &
  ExtraProps) => {
  return <h4 className="font-bold text-lg mt-3 mb-1">{children}</h4>;
};

export const H5 = ({
  children,
}: ClassAttributes<HTMLHeadingElement> &
  HTMLAttributes<HTMLHeadingElement> &
  ExtraProps) => {
  return <h5 className="font-bold text-xl mt-2 mb-1">{children}</h5>;
};

export const H6 = ({
  children,
}: ClassAttributes<HTMLHeadingElement> &
  HTMLAttributes<HTMLHeadingElement> &
  ExtraProps) => {
  return <h6 className="font-bold text-base mt-2 mb-1">{children}</h6>;
};

export const P = ({
  children,
}: ClassAttributes<HTMLHeadingElement> &
  HTMLAttributes<HTMLHeadingElement> &
  ExtraProps) => {
  return <p>{children}</p>;
};

export const A = ({
  children,
}: ClassAttributes<HTMLHeadingElement> &
  HTMLAttributes<HTMLHeadingElement> &
  ExtraProps) => {
  return <a className="text-sky-500">{children}</a>;
};

export const BlockQoute = ({
  children,
}: ClassAttributes<HTMLHeadingElement> &
  HTMLAttributes<HTMLHeadingElement> &
  ExtraProps) => {
  return (
    <blockquote className="font-normal pl-6 text-lg">{children}</blockquote>
  );
};

export const Ul = ({
  children,
}: ClassAttributes<HTMLUListElement> & HTMLAttributes<HTMLUListElement>) => {
  return <ul className="list-disc list-inside my-2">{children}</ul>;
};

export const Li = ({
  children,
}: ClassAttributes<HTMLLIElement> & HTMLAttributes<HTMLLIElement>) => {
  return <li className="mb-1">{children}</li>;
};
