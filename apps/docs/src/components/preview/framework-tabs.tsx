"use client";

import { Tabs } from "@mantine/core";
import { useState } from "react";

interface FrameworkTabsProps {
  children: (framework: "bootstrap" | "antd") => React.ReactNode;
}

export function FrameworkTabs({ children }: FrameworkTabsProps) {
  const [framework, setFramework] = useState<string | null>("bootstrap");

  return (
    <div>
      <Tabs value={framework} onChange={setFramework} mb="md">
        <Tabs.List>
          <Tabs.Tab value="bootstrap" fz="sm" fw={500}>
            Bootstrap
          </Tabs.Tab>
          <Tabs.Tab value="antd" fz="sm" fw={500}>
            Ant Design
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      {children(framework as "bootstrap" | "antd")}
    </div>
  );
}
