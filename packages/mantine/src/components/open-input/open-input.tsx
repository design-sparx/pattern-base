import {
  ActionIcon,
  Badge,
  Group,
  Stack,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { IconSend } from "@tabler/icons-react";
import { type KeyboardEvent, useRef, useState } from "react";

import type { OpenInputProps } from "@patternbase/core";

export function OpenInput({
  placeholder = "Ask anything...",
  onSubmit,
  isLoading = false,
  suggestions = [],
  maxLength,
}: OpenInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Stack gap="xs">
      {suggestions.length > 0 && !value && (
        <Group gap="xs" wrap="wrap">
          {suggestions.map((s) => (
            <Badge
              key={s}
              variant="light"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setValue(s);
                textareaRef.current?.focus();
              }}
            >
              {s}
            </Badge>
          ))}
        </Group>
      )}

      <Group gap="xs" align="flex-end">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => { setValue(e.currentTarget.value); }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          autosize
          minRows={1}
          maxRows={6}
          maxLength={maxLength}
          style={{ flex: 1 }}
        />
        <Tooltip label={isLoading ? "Generating..." : "Send"}>
          <ActionIcon
            size="lg"
            variant="filled"
            onClick={handleSubmit}
            disabled={!value.trim() || isLoading}
            loading={isLoading}
          >
            <IconSend size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Stack>
  );
}
