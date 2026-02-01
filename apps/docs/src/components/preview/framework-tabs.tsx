"use client";

import { SegmentedControl } from "@mantine/core";

interface FrameworkTabsProps {
  children: (framework: "bootstrap" | "antd") => React.ReactNode;
  onChange?: (framework: "bootstrap" | "antd") => void;
}

export function FrameworkTabs({ children }: FrameworkTabsProps) {
  const framework: "bootstrap" | "antd" = "bootstrap";

  return <div>{children(framework)}</div>;
}

export function FrameworkToggle({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <SegmentedControl
      size="xs"
      value={value}
      onChange={onChange}
      data={[
        { label: "Bootstrap", value: "bootstrap" },
        { label: "Ant Design", value: "antd" },
      ]}
    />
  );
}
