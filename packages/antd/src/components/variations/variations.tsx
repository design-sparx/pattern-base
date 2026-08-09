import { CheckCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Space, Tabs, Tag, theme, Typography } from "antd";

import type { VariationsProps } from "@patternbase/core";

const { Text } = Typography;

export function Variations({
  variations,
  selectedId,
  onSelect,
  layout = "grid",
  columns = 2,
}: VariationsProps) {
  const { token } = theme.useToken();
  if (layout === "tabs") {
    const items = variations.map((v, i) => ({
      key: v.id,
      label: v.label ?? `Variation ${String(i + 1)}`,
      children: (
        <div
          style={{
            padding: 16,
            border: `1px solid ${token.colorBorderSecondary}`,
            borderRadius: 8,
          }}
        >
          {v.content}
        </div>
      ),
    }));

    return (
      <Tabs
        activeKey={selectedId ?? variations[0]?.id}
        onChange={(key) => onSelect?.(key)}
        items={items}
      />
    );
  }

  if (layout === "list") {
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        {variations.map((v, i) => (
          <Card
            key={v.id}
            size="small"
            hoverable={Boolean(onSelect)}
            style={{
              borderColor: selectedId === v.id ? token.colorPrimary : undefined,
              cursor: onSelect ? "pointer" : "default",
            }}
            onClick={() => onSelect?.(v.id)}
          >
            <Space direction="vertical" size={4} style={{ width: "100%" }}>
              <Space>
                <Tag>{v.label ?? `#${String(i + 1)}`}</Tag>
                {selectedId === v.id && (
                  <Tag color="blue" icon={<CheckCircleOutlined />}>
                    Selected
                  </Tag>
                )}
              </Space>
              <Text style={{ fontSize: 13 }}>{v.content}</Text>
            </Space>
          </Card>
        ))}
      </Space>
    );
  }

  // grid
  return (
    <Row gutter={[16, 16]}>
      {variations.map((v, i) => (
        <Col key={v.id} xs={24} md={24 / columns}>
          <Card
            size="small"
            hoverable={Boolean(onSelect)}
            style={{
              height: "100%",
              borderColor: selectedId === v.id ? token.colorPrimary : undefined,
              cursor: onSelect ? "pointer" : "default",
            }}
            onClick={() => onSelect?.(v.id)}
          >
            <Space direction="vertical" size={8} style={{ width: "100%" }}>
              <Space>
                <Tag>{v.label ?? `Variation ${String(i + 1)}`}</Tag>
                {selectedId === v.id && (
                  <Tag color="blue" icon={<CheckCircleOutlined />}>
                    Selected
                  </Tag>
                )}
              </Space>
              <Text style={{ fontSize: 13 }}>{v.content}</Text>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
