import type { Metadata } from "next";
import {
  Badge,
  Box,
  Group,
  List,
  ListItem,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconAdjustments,
  IconArrowLeft,
  IconArrowRight,
  IconBulb,
  IconCircleCheck,
  IconCompass,
  IconEye,
  IconKeyboard,
  IconLayoutGrid,
  IconLink,
  IconShield,
  IconTargetArrow,
} from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AsideToc } from "@/components/preview/aside-toc";
import { ComponentPreview } from "@/components/preview/component-preview";
import { PropsTable } from "@/components/preview/props-table";
import { patternExplanations } from "@/data/pattern-explanations";
import { getCategoryById, getPatternBySlug, patterns } from "@/data/patterns";
import { propsData } from "@/data/props-data";

const categoryIcons: Record<string, React.ElementType> = {
  "prompt-actions": IconKeyboard,
  wayfinders: IconCompass,
  tuners: IconAdjustments,
  governors: IconEye,
  "trust-builders": IconShield,
};

const categoryColors: Record<string, string> = {
  "prompt-actions": "violet",
  wayfinders: "teal",
  tuners: "orange",
  governors: "blue",
  "trust-builders": "pink",
};

interface TocItem {
  id: string;
  label: string;
}

function buildTocItems(
  explanation: (typeof patternExplanations)[string] | undefined,
  hasProps: boolean,
): TocItem[] {
  const items: TocItem[] = [];

  if (explanation) items.push({ id: "overview", label: "Overview" });
  items.push({ id: "preview", label: "Preview" });
  if (explanation?.variants.length)
    items.push({ id: "variants", label: "Variants" });
  if (explanation?.useCases.length)
    items.push({ id: "use-cases", label: "Use Cases" });
  if (explanation?.bestPractices.length)
    items.push({ id: "best-practices", label: "Best Practices" });
  if (hasProps) items.push({ id: "props", label: "Props" });
  if (explanation?.relatedPatterns.length)
    items.push({ id: "related", label: "Related Patterns" });
  items.push({ id: "navigation", label: "Navigation" });

  return items;
}

interface PatternPageParams {
  params: Promise<{ category: string; pattern: string }>;
}

export async function generateMetadata({
  params,
}: PatternPageParams): Promise<Metadata> {
  const { category: categorySlug, pattern: patternSlug } = await params;
  const pattern = getPatternBySlug(patternSlug);
  const category = getCategoryById(categorySlug);
  if (!pattern || !category) return {};

  return {
    title: pattern.name,
    description: pattern.description,
    openGraph: {
      title: `${pattern.name} | PatternBase`,
      description: pattern.description,
    },
  };
}

export function generateStaticParams() {
  return patterns.map((p) => ({
    category: p.category,
    pattern: p.slug,
  }));
}

export default async function PatternPage({
  params,
}: Readonly<PatternPageParams>) {
  const { category: categorySlug, pattern: patternSlug } = await params;
  const pattern = getPatternBySlug(patternSlug);
  const category = getCategoryById(categorySlug);

  if (!pattern || !category) notFound();

  const color = categoryColors[pattern.category] ?? "violet";
  const Icon = categoryIcons[pattern.category] ?? IconLayoutGrid;

  const currentIndex = patterns.findIndex((p) => p.id === pattern.id);
  const prev = currentIndex > 0 ? patterns[currentIndex - 1] : null;
  const next =
    currentIndex < patterns.length - 1 ? patterns[currentIndex + 1] : null;

  const hasProps = pattern.id in propsData;
  const explanation = patternExplanations[pattern.id] ?? null;
  const tocItems = buildTocItems(explanation, hasProps);

  return (
    <Box p="xl">
      {/* Inject TOC into AppShell aside */}
      <AsideToc items={tocItems} />

      {/* Header */}
      <Box mb="lg">
        <Group gap="sm" mb="xs">
          <ThemeIcon variant="light" color={color} size="md">
            <Icon size={16} />
          </ThemeIcon>
          <Title order={1}>{pattern.name}</Title>
        </Group>
        <Text c="dimmed" fz="lg">
          {pattern.description}
        </Text>
        <Group gap={4} mt="sm">
          {pattern.tags.map((tag) => (
            <Badge key={tag} size="xs" variant="light" color="gray">
              {tag}
            </Badge>
          ))}
        </Group>
      </Box>

      {/* Overview */}
      <Box id="overview" mb="xl" style={{ scrollMarginTop: 80 }}>
        <Text fz="md" lh={1.7}>
          {explanation.overview}
        </Text>
      </Box>

      {/* Preview */}
      <Box id="preview" style={{ scrollMarginTop: 80 }}>
        <ComponentPreview patternId={pattern.id} />
      </Box>

      {/* Variants */}
      {explanation.variants.length ? (
        <Box id="variants" mt={36} style={{ scrollMarginTop: 80 }}>
          <Group gap="xs" mb="md">
            <ThemeIcon variant="light" color={color} size="sm">
              <IconBulb size={14} />
            </ThemeIcon>
            <Title order={3}>Variants</Title>
          </Group>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            {explanation.variants.map((v) => (
              <Paper key={v.title} p="md" radius="md" withBorder>
                <Text fw={600} fz="sm" mb={4}>
                  {v.title}
                </Text>
                <Text fz="sm" c="dimmed" lh={1.6}>
                  {v.description}
                </Text>
              </Paper>
            ))}
          </SimpleGrid>
        </Box>
      ) : null}

      {/* Use Cases */}
      {explanation.useCases.length ? (
        <Box id="use-cases" mt={36} style={{ scrollMarginTop: 80 }}>
          <Group gap="xs" mb="md">
            <ThemeIcon variant="light" color={color} size="sm">
              <IconTargetArrow size={14} />
            </ThemeIcon>
            <Title order={3}>Use Cases</Title>
          </Group>
          <List
            spacing="xs"
            icon={
              <ThemeIcon variant="light" color={color} size={20} radius="xl">
                <IconCircleCheck size={12} />
              </ThemeIcon>
            }
          >
            {explanation.useCases.map((uc) => (
              <ListItem key={uc}>
                <Text fz="sm" lh={1.6}>
                  {uc}
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : null}

      {/* Best Practices */}
      {explanation.bestPractices.length ? (
        <Box id="best-practices" mt={36} style={{ scrollMarginTop: 80 }}>
          <Group gap="xs" mb="md">
            <ThemeIcon variant="light" color={color} size="sm">
              <IconCircleCheck size={14} />
            </ThemeIcon>
            <Title order={3}>Best Practices</Title>
          </Group>
          <Stack gap="sm">
            {explanation.bestPractices.map((bp) => (
              <Paper key={bp} p="md" radius="md" withBorder>
                <Text fz="sm" lh={1.6}>
                  {bp}
                </Text>
              </Paper>
            ))}
          </Stack>
        </Box>
      ) : null}

      {/* Props Table */}
      {hasProps ? (
        <Box id="props" mt={36} style={{ scrollMarginTop: 80 }}>
          <PropsTable props={propsData[pattern.id]} />
        </Box>
      ) : null}

      {/* Related Patterns */}
      {explanation.relatedPatterns.length ? (
        <Box id="related" mt={36} style={{ scrollMarginTop: 80 }}>
          <Group gap="xs" mb="md">
            <ThemeIcon variant="light" color={color} size="sm">
              <IconLink size={14} />
            </ThemeIcon>
            <Title order={3}>Related Patterns</Title>
          </Group>
          <Group gap="sm">
            {explanation.relatedPatterns.map((rp) => {
              const related = patterns.find((p) => p.name === rp);
              return related ? (
                <Link
                  key={rp}
                  href={`/patterns/${related.category}/${related.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <Badge
                    size="lg"
                    variant="light"
                    color={categoryColors[related.category] ?? "violet"}
                    style={{ cursor: "pointer" }}
                  >
                    {rp}
                  </Badge>
                </Link>
              ) : (
                <Badge key={rp} size="lg" variant="light" color="gray">
                  {rp}
                </Badge>
              );
            })}
          </Group>
        </Box>
      ) : null}

      {/* Prev/Next Navigation */}
      <Group
        id="navigation"
        justify="space-between"
        mt="xl"
        pt="xl"
        style={{
          borderTop: "1px solid var(--mantine-color-default-border)",
          scrollMarginTop: 80,
        }}
      >
        {prev ? (
          <Link
            href={`/patterns/${prev.category}/${prev.slug}`}
            style={{
              fontSize: "var(--mantine-font-size-sm)",
              color: "var(--mantine-color-violet-6)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <IconArrowLeft size={14} />
            {prev.name}
          </Link>
        ) : (
          <Box />
        )}
        {next ? (
          <Link
            href={`/patterns/${next.category}/${next.slug}`}
            style={{
              fontSize: "var(--mantine-font-size-sm)",
              color: "var(--mantine-color-violet-6)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {next.name}
            <IconArrowRight size={14} />
          </Link>
        ) : (
          <Box />
        )}
      </Group>
    </Box>
  );
}
