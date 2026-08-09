import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Loader,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import type { GalleryProps } from "@patternbase/core";

export function Gallery({
  items,
  onSelect,
  onLoadMore,
  columns = 3,
  selectable = false,
  loading = false,
  emptyMessage = "No items to display",
}: GalleryProps) {
  if (items.length === 0 && !loading) {
    return (
      <Text size="sm" c="dimmed" ta="center">
        {emptyMessage}
      </Text>
    );
  }

  return (
    <Stack gap="sm">
      <SimpleGrid cols={columns} spacing="sm">
        {items.map((item) => (
          <Card
            key={item.id}
            padding="xs"
            withBorder
            style={{
              cursor: onSelect || selectable ? "pointer" : "default",
              outline: item.selected
                ? "2px solid var(--mantine-color-violet-6)"
                : undefined,
            }}
            onClick={() => onSelect?.(item)}
          >
            <Stack gap="xs">
              {item.type === "image" && item.src && (
                <Image
                  src={item.src}
                  alt={item.alt ?? item.title ?? ""}
                  radius="sm"
                  h={120}
                  fit="cover"
                />
              )}
              {item.type === "text" && item.content && (
                <Text size="xs" lineClamp={4}>
                  {item.content}
                </Text>
              )}
              <Group justify="space-between" align="center">
                {item.title && (
                  <Text size="xs" fw={500}>
                    {item.title}
                  </Text>
                )}
                {item.selected && (
                  <Badge size="xs" variant="filled" color="violet">
                    Selected
                  </Badge>
                )}
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>

      {loading && (
        <Group justify="center">
          <Loader size="sm" />
        </Group>
      )}

      {onLoadMore && !loading && (
        <Group justify="center">
          <Button variant="subtle" size="sm" onClick={onLoadMore}>
            Load more
          </Button>
        </Group>
      )}
    </Stack>
  );
}
