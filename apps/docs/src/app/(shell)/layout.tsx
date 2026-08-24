import { AppShellLayout } from "@/components/layout/app-shell/app-shell-layout";

export default function ShellLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppShellLayout>{children}</AppShellLayout>;
}
