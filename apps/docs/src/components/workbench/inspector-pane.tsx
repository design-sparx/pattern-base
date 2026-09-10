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
import Link from "next/link";

import { useWorkbench } from "./workbench-context";

import { CodeBlock } from "@/components/preview/code-block";
import { PropsTable } from "@/components/preview/props-table";
import type { PatternExplanation } from "@/data/pattern-explanations";
import type { PropDefinition } from "@/data/props-data";
import { INSPECTOR_TABS, type InspectorTab } from "@/lib/workbench-params";

/** A related pattern resolved to a route; `href` is absent when unresolved. */
export interface RelatedPatternLink {
  label: string;
  href?: string;
}

interface InspectorPaneProps {
  patternId: string;
  snippets: {
    bootstrap: string;
    antd: string;
    mantine: string;
    shadcn: string;
  };
  propDefinitions?: PropDefinition[];
  explanation?: PatternExplanation | null;
  relatedLinks?: readonly RelatedPatternLink[];
}

export function InspectorPane({
  patternId,
  snippets,
  propDefinitions,
  explanation,
  relatedLinks,
}: Readonly<InspectorPaneProps>) {
  const { framework, tab, setTab } = useWorkbench();

  const isTabAvailable = (candidate: InspectorTab) => {
    if (candidate === "props") return Boolean(propDefinitions?.length);
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
          {propDefinitions?.length ? (
            <Tabs.Tab value="props">Props</Tabs.Tab>
          ) : null}
          {explanation ? <Tabs.Tab value="docs">Docs</Tabs.Tab> : null}
        </Tabs.List>

        {/* keepMounted keeps prose/tables in the prerendered HTML (SEO);
            Mantine hides inactive panels via display:none. */}
        <Tabs.Panel value="code" p="md" keepMounted>
          <CodeBlock code={snippets[framework]} filename={`${patternId}.tsx`} />
        </Tabs.Panel>

        {propDefinitions?.length ? (
          <Tabs.Panel value="props" p="md" keepMounted>
            <PropsTable props={propDefinitions} />
          </Tabs.Panel>
        ) : null}

        {explanation ? (
          <Tabs.Panel value="docs" p="md" keepMounted>
            <InspectorDocs
              explanation={explanation}
              relatedLinks={relatedLinks ?? []}
            />
          </Tabs.Panel>
        ) : null}
      </Tabs>
    </Paper>
  );
}

function InspectorDocs({
  explanation,
  relatedLinks,
}: {
  explanation: PatternExplanation;
  relatedLinks: readonly RelatedPatternLink[];
}) {
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

      {relatedLinks.length ? (
        <Box>
          <Title order={4} fz="sm" mb="sm">
            Related Patterns
          </Title>
          <Group gap="xs">
            {relatedLinks.map((link) =>
              link.href ? (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ textDecoration: "none" }}
                >
                  <Badge
                    size="lg"
                    variant="light"
                    color="violet"
                    style={{ cursor: "pointer" }}
                  >
                    {link.label}
                  </Badge>
                </Link>
              ) : (
                <Badge key={link.label} size="lg" variant="light" color="gray">
                  {link.label}
                </Badge>
              ),
            )}
          </Group>
        </Box>
      ) : null}
    </Box>
  );
}
