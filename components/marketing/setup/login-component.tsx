import SignIn from "@/components/auth/signin";

export default function LoginComponent({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  return (
    <>
      <h3 className="font-medium text-3xl">最初のステップ</h3>
      <p className="text-muted-foreground">
        まず始めにアカウントを作りましょう。
      </p>
      <SignIn />
    </>
  );
}
