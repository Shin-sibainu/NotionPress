export default function TagToBlogListPage({
  params,
}: {
  params: { tag: string };
}) {
  const tag = params.tag;

  return (
    <div>
      <div>{tag}</div>
    </div>
  );
}
