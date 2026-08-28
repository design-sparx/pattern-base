import { PublicShellLayout } from "@/components/layout/public-shell/public-shell-layout";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <PublicShellLayout>{children}</PublicShellLayout>;
}
