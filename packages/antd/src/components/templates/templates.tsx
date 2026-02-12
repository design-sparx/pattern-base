import { Card, Col, Input, List, Row, Space, Typography } from "antd";
import { useState } from "react";

import type { TemplatesProps } from "@ai-ui/core";

const { Text } = Typography;

export function Templates({
  templates,
  onSelect,
  layout = "grid",
  columns = 3,
  searchable = false,
  groupByCategory = false,
}: Readonly<TemplatesProps>) {
  const [search, setSearch] = useState("");

  const filtered = search
    ? templates.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.description?.toLowerCase().includes(search.toLowerCase()),
      )
    : templates;

  const grouped = groupByCategory
    ? filtered.reduce<Record<string, typeof filtered>>((acc, t) => {
        const cat = t.category ?? "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(t);
        return acc;
      }, {})
    : { "": filtered };

  return (
    <div>
      {searchable ? (
        <Input.Search
          placeholder="Search templates..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          style={{ marginBottom: 16 }}
        />
      ) : null}

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} style={{ marginBottom: category ? 24 : 0 }}>
          {category ? (
            <Text strong style={{ display: "block", marginBottom: 8 }}>
              {category}
            </Text>
          ) : null}

          {layout === "list" ? (
            <List
              size="small"
              dataSource={items}
              renderItem={(t) => (
                <List.Item
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    onSelect(t);
                  }}
                >
                  <Space>
                    {t.icon ? <span>{t.icon}</span> : null}
                    <div>
                      <Text strong>{t.name}</Text>
                      {t.description ? (
                        <div>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {t.description}
                          </Text>
                        </div>
                      ) : null}
                    </div>
                  </Space>
                </List.Item>
              )}
            />
          ) : (
            <Row gutter={[16, 16]}>
              {items.map((t) => (
                <Col key={t.id} xs={24} md={24 / columns}>
                  <Card
                    hoverable
                    size="small"
                    onClick={() => {
                      onSelect(t);
                    }}
                    style={{ height: "100%" }}
                  >
                    <Space direction="vertical" size={4}>
                      <Text strong>
                        {t.icon ? (
                          <span style={{ marginRight: 8 }}>{t.icon}</span>
                        ) : null}
                        {t.name}
                      </Text>
                      {t.description ? (
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {t.description}
                        </Text>
                      ) : null}
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
      ))}
    </div>
  );
}
