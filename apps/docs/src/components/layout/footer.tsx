import { Box, Text } from "@mantine/core";

export function Footer() {
  return (
    <Box
      component="footer"
      py="lg"
      px="lg"
      style={{
        borderTop: "1px solid var(--mantine-color-gray-2)",
        textAlign: "center",
      }}
    >
      <Text fz="sm" c="gray.5">
        AI Vory - AI UX Pattern Library. Based on shapeof.ai patterns.
      </Text>
    </Box>
  );
}
