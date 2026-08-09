import { Card, List, Radio, Space, Tag, Typography } from "antd";

import type { ModelInfo, ModelManagementProps } from "@patternbase/core";

const { Text } = Typography;

export function ModelManagement({
  models,
  selectedModelId,
  onSelectModel,
  showDetails = true,
  groupByProvider = true,
}: ModelManagementProps) {
  const grouped = groupByProvider
    ? models.reduce<Record<string, ModelInfo[]>>((acc, m) => {
        const key = m.provider;
        if (!acc[key]) acc[key] = [];
        acc[key].push(m);
        return acc;
      }, {})
    : { All: models };

  return (
    <Card title="Model Selection" size="small">
      <Radio.Group
        value={selectedModelId}
        onChange={(e) => {
          onSelectModel(e.target.value as string);
        }}
        style={{ width: "100%" }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          {Object.entries(grouped).map(([provider, providerModels]) => (
            <div key={provider}>
              {groupByProvider ? (
                <Text
                  type="secondary"
                  strong
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  {provider}
                </Text>
              ) : null}
              <List
                size="small"
                dataSource={providerModels}
                renderItem={(model) => (
                  <List.Item
                    style={{
                      cursor: "pointer",
                      background:
                        model.id === selectedModelId ? "#e6f4ff" : undefined,
                      padding: "8px 12px",
                      borderRadius: 6,
                    }}
                    onClick={() => {
                      onSelectModel(model.id);
                    }}
                  >
                    <Space
                      direction="vertical"
                      size={2}
                      style={{ width: "100%" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Space>
                          <Radio value={model.id} />
                          <Text strong style={{ fontSize: 13 }}>
                            {model.name}
                          </Text>
                        </Space>
                        {model.capabilities ? (
                          <Space size={4}>
                            {model.capabilities.slice(0, 3).map((c) => (
                              <Tag key={c} style={{ fontSize: 10, margin: 0 }}>
                                {c}
                              </Tag>
                            ))}
                          </Space>
                        ) : null}
                      </div>

                      {showDetails ? (
                        <Space style={{ paddingLeft: 32 }} size={16}>
                          {model.description ? (
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {model.description}
                            </Text>
                          ) : null}
                          {model.contextWindow ? (
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              Context: {(model.contextWindow / 1000).toFixed(0)}
                              k
                            </Text>
                          ) : null}
                          {model.costPer1kInput !== undefined && (
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              ${model.costPer1kInput}/1k in
                            </Text>
                          )}
                        </Space>
                      ) : null}
                    </Space>
                  </List.Item>
                )}
              />
            </div>
          ))}
        </Space>
      </Radio.Group>
    </Card>
  );
}
