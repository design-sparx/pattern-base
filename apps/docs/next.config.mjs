/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@patternbase/core",
    "@patternbase/bootstrap",
    "@patternbase/antd",
    "@patternbase/mantine",
    "@patternbase/shadcn",
  ],
  async redirects() {
    return [{ source: "/about", destination: "/#about", permanent: true }];
  },
  async headers() {
    const headers = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ];
    if (process.env.NODE_ENV === "production") {
      headers.push({
        key: "Content-Security-Policy",
        value:
          "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data: fonts.gstatic.com; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
      });
    }
    return [{ source: "/:path*", headers }];
  },
};

export default nextConfig;
