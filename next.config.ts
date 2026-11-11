import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site has no server-side features, so it is exported as plain static
  // files (into /out) and served by nginx on the server, like the app.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
