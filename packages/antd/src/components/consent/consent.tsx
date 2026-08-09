import { Button, Card, Checkbox, Space, Typography } from "antd";
import { useState } from "react";

import type { ConsentProps } from "@patternbase/core";

const { Text } = Typography;

export function Consent({
  items,
  onAccept,
  onDecline,
  title,
  description,
  acceptLabel = "Accept",
  declineLabel = "Decline",
}: Readonly<ConsentProps>) {
  const [checked, setChecked] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const item of items) {
      if (item.defaultChecked) initial.add(item.id);
    }
    return initial;
  });

  const requiredMet = items
    .filter((i) => i.required)
    .every((i) => checked.has(i.id));

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Card size="small">
      {title ? (
        <Text strong style={{ display: "block", marginBottom: 4 }}>
          {title}
        </Text>
      ) : null}
      {description ? (
        <Text
          type="secondary"
          style={{ display: "block", marginBottom: 12, fontSize: 13 }}
        >
          {description}
        </Text>
      ) : null}

      <Space direction="vertical" style={{ width: "100%" }}>
        {items.map((item) => (
          <Checkbox
            key={item.id}
            checked={checked.has(item.id)}
            onChange={() => {
              toggle(item.id);
            }}
          >
            <span>
              {item.label}
              {item.required ? (
                <Text type="danger" style={{ marginLeft: 2 }}>
                  *
                </Text>
              ) : null}
            </span>
            {item.description ? (
              <div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {item.description}
                </Text>
              </div>
            ) : null}
          </Checkbox>
        ))}
      </Space>

      <Space style={{ marginTop: 12 }}>
        <Button
          type="primary"
          size="small"
          disabled={!requiredMet}
          onClick={() => {
            onAccept(Array.from(checked));
          }}
        >
          {acceptLabel}
        </Button>
        {onDecline ? (
          <Button size="small" onClick={onDecline}>
            {declineLabel}
          </Button>
        ) : null}
      </Space>
    </Card>
  );
}
