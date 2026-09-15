import { DeleteOutlined, ExportOutlined } from "@ant-design/icons";
import { Button, Card, List, Space, Tag, Typography } from "antd";

import type { DataOwnershipProps } from "@patternbase/core";

const { Text } = Typography;

export function DataOwnership({
  items,
  onDelete,
  onExport,
  onDeleteAll,
  title,
}: Readonly<DataOwnershipProps>) {
  return (
    <Card size="small">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        {title ? <Text strong>{title}</Text> : null}
        <Space>
          {onExport ? (
            <Button size="small" icon={<ExportOutlined />} onClick={onExport}>
              Export data
            </Button>
          ) : null}
          {onDeleteAll ? (
            <Button size="small" danger onClick={onDeleteAll}>
              Delete all
            </Button>
          ) : null}
        </Space>
      </div>

      <List
        size="small"
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            actions={
              item.deletable && onDelete
                ? [
                    <Button
                      key="delete"
                      variant="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        onDelete(item.id);
                      }}
                    />,
                  ]
                : undefined
            }
          >
            <List.Item.Meta
              title={<Text style={{ fontSize: 13 }}>{item.dataType}</Text>}
              description={
                <div>
                  {item.description ? (
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {item.description}
                    </Text>
                  ) : null}
                  {item.retention ? (
                    <div style={{ marginTop: 4 }}>
                      <Tag>Retention: {item.retention}</Tag>
                    </div>
                  ) : null}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}
