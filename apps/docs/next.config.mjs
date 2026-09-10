/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@patternbase/core", "@patternbase/bootstrap", "@patternbase/antd", "@patternbase/mantine", "@patternbase/shadcn"],
  async redirects() {
    return [{ source: "/about", destination: "/#about", permanent: true }];
  },
};

export default nextConfig;
