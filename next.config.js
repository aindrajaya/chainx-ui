module.exports = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.windsor.io/",
        port: "",
        pathname: "/avatar.windsor.io/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}