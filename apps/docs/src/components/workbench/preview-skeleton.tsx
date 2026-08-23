import { Box, Skeleton } from "@mantine/core";

export function PreviewSkeleton() {
  return (
    <Box mih={220} p="md">
      <Skeleton height={16} radius="sm" mb="md" />
      <Skeleton height={120} radius="md" />
    </Box>
  );
}
