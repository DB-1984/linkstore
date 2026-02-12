import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js to treat .md and .mdx files as pages
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
