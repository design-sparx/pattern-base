import { AppShellLayout } from "@/components/layout/app-shell-layout";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppShellLayout>{children}</AppShellLayout>;
}
