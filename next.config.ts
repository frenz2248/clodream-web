/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com", // Izin untuk Vercel Blob
        port: "",
      },
    ],
  },
};

export default nextConfig;
