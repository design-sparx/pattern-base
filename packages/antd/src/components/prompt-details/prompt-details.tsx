import { Card, Space, Tag, Typography } from "antd";

import type { PromptDetailsProps } from "@patternbase/core";

const { Text, Link } = Typography;

export function PromptDetails({
  prompt,
  details,
  timestamp,
  model,
  tokenCount,
  variant = "card",
}: Readonly<PromptDetailsProps>) {
  const metaItems = (
    <Space wrap style={{ marginTop: 8 }}>
      {model ? <Tag>{model}</Tag> : null}
      {tokenCount != null ? <Tag>{tokenCount} tokens</Tag> : null}
      {timestamp ? (
        <Text type="secondary" style={{ fontSize: 12 }}>
          {timestamp.toLocaleString()}
        </Text>
      ) : null}
    </Space>
  );

  const detailList = (
    <div style={{ marginTop: 8 }}>
      {details.map((d) => (
        <div key={d.id} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
          <Text type="secondary" strong style={{ fontSize: 13 }}>
            {d.label}:
          </Text>
          {d.type === "badge" ? (
            <Tag color="blue">{d.value}</Tag>
          ) : d.type === "link" && d.url ? (
            <Link href={d.url} target="_blank" style={{ fontSize: 13 }}>
              {d.value}
            </Link>
          ) : (
            <Text style={{ fontSize: 13 }}>{d.value}</Text>
          )}
        </div>
      ))}
    </div>
  );

  if (variant === "inline") {
    return (
      <div>
        <Text style={{ fontSize: 13 }}>{prompt}</Text>
        {detailList}
        {metaItems}
      </div>
    );
  }

  return (
    <Card size="small">
      <Text style={{ fontSize: 13 }}>{prompt}</Text>
      {detailList}
      {metaItems}
    </Card>
  );
}
