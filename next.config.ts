import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
		remotePatterns: [
			{ hostname: "ideal-warthog-671.convex.cloud" },
			// { hostname: "paste-image-url-for-dall-e-from-convex" },
		],
	},
};

export default nextConfig;
