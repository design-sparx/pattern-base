"use client";

import {
  Badge,
  Box,
  Group,
  List,
  ListItem,
  Paper,
  Tabs,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconBulb,
  IconCircleCheck,
  IconTargetArrow,
} from "@tabler/icons-react";

import { useWorkbench } from "./workbench-context";

import { CodeBlock } from "@/components/preview/code-block";
import { PropsTable } from "@/components/preview/props-table";
import type { PatternExplanation } from "@/data/pattern-explanations";
import type { PropDefinition } from "@/data/props-data";
import { INSPECTOR_TABS, type InspectorTab } from "@/lib/workbench-params";

interface InspectorPaneProps {
  patternId: string;
  snippets: { bootstrap: string; antd: string; mantine: string };
  propsDefinitions?: PropDefinition[];
  explanation?: PatternExplanation | null;
}

export function InspectorPane({
  patternId,
  snippets,
  propsDefinitions,
  explanation,
}: Readonly<InspectorPaneProps>) {
  const { framework, tab, setTab } = useWorkbench();

  const isTabAvailable = (candidate: InspectorTab) => {
    if (candidate === "props") return Boolean(propsDefinitions?.length);
    if (candidate === "docs") return Boolean(explanation);
    return true;
  };

  const activeTab: InspectorTab = isTabAvailable(tab) ? tab : "code";

  return (
    <Paper withBorder style={{ overflow: "hidden" }} h="100%">
      <Tabs
        value={activeTab}
        onChange={(raw) => {
          const value = INSPECTOR_TABS.find((candidate) => candidate === raw);
          if (value && isTabAvailable(value)) {
            setTab(value);
          }
        }}
        variant="outline"
        radius={0}
        styles={{
          tabLabel: { fontWeight: 500 },
        }}
      >
        <Tabs.List grow>
          <Tabs.Tab value="code">Code</Tabs.Tab>
          {propsDefinitions?.length ? (
            <Tabs.Tab value="props">Props</Tabs.Tab>
          ) : null}
          {explanation ? <Tabs.Tab value="docs">Docs</Tabs.Tab> : null}
        </Tabs.List>

        <Tabs.Panel value="code" p="md">
          <CodeBlock code={snippets[framework]} filename={`${patternId}.tsx`} />
        </Tabs.Panel>

        {propsDefinitions?.length ? (
          <Tabs.Panel value="props" p="md">
            <PropsTable props={propsDefinitions} />
          </Tabs.Panel>
        ) : null}

        {explanation ? (
          <Tabs.Panel value="docs" p="md">
            <InspectorDocs explanation={explanation} />
          </Tabs.Panel>
        ) : null}
      </Tabs>
    </Paper>
  );
}

function InspectorDocs({ explanation }: { explanation: PatternExplanation }) {
  return (
    <Box>
      <Text fz="sm" lh={1.7} mb="lg">
        {explanation.overview}
      </Text>

      {explanation.variants.length ? (
        <Box mb="lg">
          <Group gap="xs" mb="sm">
            <ThemeIcon variant="light" color="violet" size="sm">
              <IconBulb size={14} />
            </ThemeIcon>
            <Title order={4} fz="sm">
              Variants
            </Title>
          </Group>
          <List spacing="xs" fz="sm">
            {explanation.variants.map((v) => (
              <ListItem key={v.title}>
                <Text fz="sm">
                  <b>{v.title}</b> — {v.description}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : null}

      {explanation.useCases.length ? (
        <Box mb="lg">
          <Group gap="xs" mb="sm">
            <ThemeIcon variant="light" color="violet" size="sm">
              <IconTargetArrow size={14} />
            </ThemeIcon>
            <Title order={4} fz="sm">
              Use Cases
            </Title>
          </Group>
          <List spacing="xs" fz="sm">
            {explanation.useCases.map((uc) => (
              <ListItem key={uc}>{uc}</ListItem>
            ))}
          </List>
        </Box>
      ) : null}

      {explanation.bestPractices.length ? (
        <Box mb="lg">
          <Group gap="xs" mb="sm">
            <ThemeIcon variant="light" color="teal" size="sm">
              <IconCircleCheck size={14} />
            </ThemeIcon>
            <Title order={4} fz="sm">
              Best Practices
            </Title>
          </Group>
          <List spacing="xs" fz="sm">
            {explanation.bestPractices.map((bp) => (
              <ListItem key={bp}>{bp}</ListItem>
            ))}
          </List>
        </Box>
      ) : null}

      {explanation.relatedPatterns.length ? (
        <Box>
          <Title order={4} fz="sm" mb="sm">
            Related Patterns
          </Title>
          <Group gap="xs">
            {explanation.relatedPatterns.map((rp) => (
              <Badge key={rp} size="sm" variant="light" color="gray">
                {rp}
              </Badge>
            ))}
          </Group>
        </Box>
      ) : null}
    </Box>
  );
}
