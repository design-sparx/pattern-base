import { ActionIcon, Badge, Group, Progress, Stack, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconTrash, IconUpload } from "@tabler/icons-react";

import type { AttachmentsProps } from "@patternbase/core";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${String(bytes)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function Attachments({
  attachments,
  onAdd,
  onRemove,
  maxFiles,
  acceptedTypes,
  showPreview = false,
}: Readonly<AttachmentsProps>) {
  const canAdd = !maxFiles || attachments.length < maxFiles;

  const mimeTypes = acceptedTypes?.reduce<Record<string, string[]>>(
    (acc, type) => {
      acc[type] = [];
      return acc;
    },
    {},
  );

  return (
    <Stack gap="sm">
      {canAdd ? <Dropzone
          onDrop={(files) => { onAdd(files as unknown as File[]); }}
          accept={mimeTypes}
          multiple
        >
          <Group
            justify="center"
            gap="xs"
            style={{ minHeight: 60, pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload size={20} />
            </Dropzone.Accept>
            <Dropzone.Idle>
              <IconUpload size={20} style={{ opacity: 0.4 }} />
            </Dropzone.Idle>
            <Text size="sm" c="dimmed">
              Drop files here or click to upload
            </Text>
          </Group>
        </Dropzone> : null}

      {attachments.map((a) => (
        <Group key={a.id} gap="sm" align="flex-start">
          {showPreview && a.previewUrl ? <img
              src={a.previewUrl}
              alt={a.name}
              style={{
                width: 40,
                height: 40,
                objectFit: "cover",
                borderRadius: 4,
              }}
            /> : null}
          <Stack gap={2} style={{ flex: 1 }}>
            <Group justify="space-between" align="center">
              <Text size="sm" fw={500}>
                {a.name}
              </Text>
              <ActionIcon
                variant="subtle"
                color="red"
                size="sm"
                onClick={() => { onRemove(a.id); }}
              >
                <IconTrash size={14} />
              </ActionIcon>
            </Group>
            <Group gap="xs">
              <Text size="xs" c="dimmed">
                {formatSize(a.size)}
              </Text>
              {a.status === "error" && (
                <Badge size="xs" color="red">
                  Error
                </Badge>
              )}
            </Group>
            {a.status === "uploading" && a.progress !== undefined && (
              <Progress value={a.progress} size="xs" mt={2} />
            )}
          </Stack>
        </Group>
      ))}
    </Stack>
  );
}
