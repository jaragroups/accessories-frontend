/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  images: {
    remotePatterns: [new URL("https://accessories.admin.ngengroup.org/**")],
  },
};

export default nextConfig;
