import {
  Anchor,
  Badge,
  Box,
  Breadcrumbs,
  Group,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ComponentPreview } from "@/components/preview/component-preview";
import { getCategoryById, getPatternBySlug, patterns } from "@/data/patterns";

interface Props {
  params: { category: string; pattern: string };
}

export function generateStaticParams() {
  return patterns.map((p) => ({
    category: p.category,
    pattern: p.slug,
  }));
}

export default function PatternPage({ params }: Props) {
  const pattern = getPatternBySlug(params.pattern);
  const category = getCategoryById(params.category);

  if (!pattern || !category) notFound();

  return (
    <Box p="xl" maw={1000}>
      <Breadcrumbs fz="sm" mb="lg" separator="/">
        <Anchor component={Link} href="/patterns" c="gray.5" fz="sm">
          Patterns
        </Anchor>
        <Anchor
          component={Link}
          href={`/patterns/${category.id}`}
          c="gray.5"
          fz="sm"
        >
          {category.name}
        </Anchor>
        <Text fz="sm" c="gray.9" fw={500}>
          {pattern.name}
        </Text>
      </Breadcrumbs>

      <Box mb="lg">
        <Group gap="sm" mb="xs">
          <Title order={1} c="gray.9">
            {pattern.name}
          </Title>
          <Badge size="sm" variant="light" color="blue" radius="xl">
            {category.name}
          </Badge>
        </Group>
        <Text c="gray.6" fz="lg">
          {pattern.description}
        </Text>
        <Group gap={4} mt="sm">
          {pattern.tags.map((tag) => (
            <Badge key={tag} size="xs" variant="light" color="gray" radius="sm">
              {tag}
            </Badge>
          ))}
        </Group>
      </Box>

      <ComponentPreview patternId={pattern.id} />
    </Box>
  );
}
