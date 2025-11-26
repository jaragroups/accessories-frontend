/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://accessories.admin.ngengroup.org/**"),
      new URL("https://cdn.dummyjson.com/**"),
    ],
  },
};

export default nextConfig;
