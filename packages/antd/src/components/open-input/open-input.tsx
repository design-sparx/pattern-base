import { LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Input, Space, Tag } from "antd";
import { type KeyboardEvent, useRef, useState } from "react";

import type { OpenInputProps } from "@patternbase/core";

const { TextArea } = Input;

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
    <Space direction="vertical" style={{ width: "100%" }}>
      {suggestions.length > 0 && !value && (
        <Space wrap>
          {suggestions.map((s) => (
            <Tag
              key={s}
              color="default"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setValue(s);
                textareaRef.current?.focus();
              }}
            >
              {s}
            </Tag>
          ))}
        </Space>
      )}

      <Space.Compact style={{ width: "100%" }}>
        <TextArea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          autoSize={{ minRows: 1, maxRows: 6 }}
          maxLength={maxLength}
          style={{ resize: "none" }}
        />
        <Button
          type="primary"
          icon={isLoading ? <LoadingOutlined /> : <SendOutlined />}
          onClick={handleSubmit}
          disabled={!value.trim() || isLoading}
          loading={isLoading}
        >
          {isLoading ? "Generating..." : "Send"}
        </Button>
      </Space.Compact>
    </Space>
  );
}
