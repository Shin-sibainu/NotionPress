/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "czvzxzjqqaskbqsqrvyu.supabase.co",
      },
    ],
  },
};

export default nextConfig;
