/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    domains: ["doost-apis.liara.run"],
  },
};

export default nextConfig;
