import Link from "next/link";
interface Props {
  tag: string;
  domain: string;
}

const Tag = ({ tag, domain }: Props) => {
  return (
    <Link
      href={`/classic/${domain}/tags/${tag}/1`}
      className="mr-3 mt-1 text-lg font-medium text-pink-500 hover:text-pink-600 dark:hover:text-pink-400"
    >
      {tag}
    </Link>
  );
};

export default Tag;
