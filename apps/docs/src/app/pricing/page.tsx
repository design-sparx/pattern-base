import { Box, Paper, SimpleGrid, Stack, Text, Title } from "@mantine/core";

export default function PricingPage() {
  return (
    <Box p="xl" maw={800}>
      <Title order={1} c="gray.9" mb="sm">
        Pricing
      </Title>
      <Text c="gray.6" mb="xl">
        AI Vory is currently in early development. Pricing details coming soon.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        <Paper withBorder radius="md" p="lg">
          <Title order={3} fz="lg" c="gray.9" mb="xs">
            Community
          </Title>
          <Text fz="xl" fw={700} c="gray.9" mb="md">
            Free
          </Text>
          <Stack gap="xs">
            <Text fz="sm" c="gray.6">
              All 10 patterns
            </Text>
            <Text fz="sm" c="gray.6">
              Bootstrap + Ant Design
            </Text>
            <Text fz="sm" c="gray.6">
              MIT License
            </Text>
            <Text fz="sm" c="gray.6">
              Community support
            </Text>
          </Stack>
        </Paper>

        <Paper
          radius="md"
          p="lg"
          style={{ border: "2px solid var(--mantine-color-blue-5)" }}
        >
          <Title order={3} fz="lg" c="gray.9" mb="xs">
            Pro
          </Title>
          <Text fz="xl" fw={700} c="gray.9" mb="md">
            <Text component="span" fz="md" c="gray.4" td="line-through">
              $49
            </Text>{" "}
            TBD
          </Text>
          <Stack gap="xs">
            <Text fz="sm" c="gray.6">
              Everything in Community
            </Text>
            <Text fz="sm" c="gray.6">
              Premium patterns
            </Text>
            <Text fz="sm" c="gray.6">
              Figma design kit
            </Text>
            <Text fz="sm" c="gray.6">
              Priority support
            </Text>
          </Stack>
        </Paper>

        <Paper withBorder radius="md" p="lg">
          <Title order={3} fz="lg" c="gray.9" mb="xs">
            Enterprise
          </Title>
          <Text fz="xl" fw={700} c="gray.9" mb="md">
            Contact us
          </Text>
          <Stack gap="xs">
            <Text fz="sm" c="gray.6">
              Everything in Pro
            </Text>
            <Text fz="sm" c="gray.6">
              Custom patterns
            </Text>
            <Text fz="sm" c="gray.6">
              White-label option
            </Text>
            <Text fz="sm" c="gray.6">
              Dedicated support
            </Text>
          </Stack>
        </Paper>
      </SimpleGrid>
    </Box>
  );
}
