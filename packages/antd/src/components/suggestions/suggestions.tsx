import { Card, Col, Row, Space, Tag, Typography } from "antd";

import type { SuggestionsProps } from "@patternbase/core";

const { Text } = Typography;

export function Suggestions({
  suggestions,
  onSelect,
  columns = 2,
  variant = "card",
}: SuggestionsProps) {
  if (variant === "chip") {
    return (
      <Space wrap>
        {suggestions.map((s) => (
          <Tag
            key={s.id}
            color="blue"
            style={{ cursor: "pointer", padding: "4px 12px", fontSize: "14px" }}
            onClick={() => {
              onSelect(s);
            }}
          >
            {s.icon ? <span style={{ marginRight: 4 }}>{s.icon}</span> : null}
            {s.title}
          </Tag>
        ))}
      </Space>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {suggestions.map((s) => (
        <Col key={s.id} xs={24} md={24 / columns}>
          <Card
            hoverable
            size="small"
            onClick={() => {
              onSelect(s);
            }}
            style={{ height: "100%" }}
          >
            <Space direction="vertical" size={4}>
              <Text strong>
                {s.icon ? (
                  <span style={{ marginRight: 8 }}>{s.icon}</span>
                ) : null}
                {s.title}
              </Text>
              {s.description ? (
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {s.description}
                </Text>
              ) : null}
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
