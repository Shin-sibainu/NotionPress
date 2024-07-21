// lib/createBlog.ts
export async function createBlog(setupData: any) {
  try {
    // 1. Notionブログの作成
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createNotionBlog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ setupData }),
    });

    // 2. ユーザープロフィール画像の更新
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/updateUserProfileImage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: setupData.userId }),
      }
    );

    // 3. ブログメタデータの作成
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createBlogMetaData`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ setupData }),
    });
  } catch (error) {
    console.error("Error in createBlog:", error);
    throw error;
  }
}
