import { Button, Card, Col, Row, Space, Typography } from "antd";

import type { InitialCtaProps } from "@ai-ui/core";

const { Title, Text } = Typography;

export function InitialCta({
  title,
  subtitle,
  actions,
  onAction,
  variant = "centered",
}: Readonly<InitialCtaProps>) {
  if (variant === "minimal") {
    return (
      <div style={{ textAlign: "center", padding: 12 }}>
        <Title level={5}>{title}</Title>
        {subtitle ? <Text type="secondary">{subtitle}</Text> : null}
        <div style={{ marginTop: 8 }}>
          <Space wrap>
            {actions.map((a) => (
              <Button
                key={a.id}
                size="small"
                onClick={() => {
                  onAction(a);
                }}
              >
                {a.icon ? (
                  <span style={{ marginRight: 4 }}>{a.icon}</span>
                ) : null}
                {a.label}
              </Button>
            ))}
          </Space>
        </div>
      </div>
    );
  }

  if (variant === "cards") {
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <Title level={5}>{title}</Title>
          {subtitle ? <Text type="secondary">{subtitle}</Text> : null}
        </div>
        <Row gutter={[16, 16]}>
          {actions.map((a) => (
            <Col key={a.id} xs={24} md={24 / Math.min(actions.length, 3)}>
              <Card
                hoverable
                style={{ textAlign: "center", height: "100%" }}
                onClick={() => {
                  onAction(a);
                }}
              >
                {a.icon ? (
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{a.icon}</div>
                ) : null}
                <Text strong>{a.label}</Text>
                {a.description ? (
                  <div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {a.description}
                    </Text>
                  </div>
                ) : null}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: 24 }}>
      <Title level={4}>{title}</Title>
      {subtitle ? <Text type="secondary">{subtitle}</Text> : null}
      <div style={{ marginTop: 16 }}>
        <Space wrap>
          {actions.map((a, i) => (
            <Button
              key={a.id}
              type={i === 0 ? "primary" : "default"}
              onClick={() => {
                onAction(a);
              }}
            >
              {a.icon ? <span style={{ marginRight: 4 }}>{a.icon}</span> : null}
              {a.label}
            </Button>
          ))}
        </Space>
      </div>
    </div>
  );
}
