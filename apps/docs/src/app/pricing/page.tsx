import {
  Badge,
  Box,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

function FeatureItem({ text }: { text: string }) {
  return (
    <Group gap="xs" align="flex-start">
      <ThemeIcon variant="light" color="green" size="xs" mt={3}>
        <IconCheck size={10} />
      </ThemeIcon>
      <Text fz="sm" c="dimmed">
        {text}
      </Text>
    </Group>
  );
}

export default function PricingPage() {
  return (
    <Box p="xl" maw={900}>
      <Title order={1} mb="sm">
        Pricing
      </Title>
      <Text c="dimmed" mb="xl">
        AI Vory is currently in early development. Pricing details coming soon.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        <Paper withBorder p="lg">
          <Title order={3} fz="lg" mb="xs">
            Community
          </Title>
          <Text fz="xl" fw={700} mb="md">
            Free
          </Text>
          <Stack gap="xs">
            <FeatureItem text="All 10 patterns" />
            <FeatureItem text="Bootstrap + Ant Design" />
            <FeatureItem text="MIT License" />
            <FeatureItem text="Community support" />
          </Stack>
        </Paper>

        <Paper
          p="lg"
          style={{
            border: "2px solid var(--mantine-color-violet-5)",
            position: "relative",
            background:
              "linear-gradient(180deg, var(--mantine-color-violet-0) 0%, transparent 40%)",
          }}
        >
          <Badge
            color="violet"
            variant="filled"
            size="sm"
            style={{ position: "absolute", top: -10, right: 16 }}
          >
            Most Popular
          </Badge>
          <Title order={3} fz="lg" mb="xs">
            Pro
          </Title>
          <Text fz="xl" fw={700} mb="md">
            <Text component="span" fz="md" c="dimmed" td="line-through">
              $49
            </Text>{" "}
            TBD
          </Text>
          <Stack gap="xs">
            <FeatureItem text="Everything in Community" />
            <FeatureItem text="Premium patterns" />
            <FeatureItem text="Figma design kit" />
            <FeatureItem text="Priority support" />
          </Stack>
        </Paper>

        <Paper withBorder p="lg">
          <Title order={3} fz="lg" mb="xs">
            Enterprise
          </Title>
          <Text fz="xl" fw={700} mb="md">
            Contact us
          </Text>
          <Stack gap="xs">
            <FeatureItem text="Everything in Pro" />
            <FeatureItem text="Custom patterns" />
            <FeatureItem text="White-label option" />
            <FeatureItem text="Dedicated support" />
          </Stack>
        </Paper>
      </SimpleGrid>
    </Box>
  );
}
