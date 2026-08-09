import { Button, Card, List, Space, Tag, Typography } from "antd";

import type { ConnectorsProps } from "@patternbase/core";

const { Text } = Typography;

const statusColorMap = {
  connected: "green",
  syncing: "blue",
  error: "red",
  disconnected: "default",
} as const;

export function Connectors({
  sources,
  onConnect,
  onDisconnect,
  onSync,
  title = "Connectors",
}: ConnectorsProps) {
  return (
    <Card title={title} size="small">
      <List
        dataSource={sources}
        rowKey="id"
        renderItem={(source) => {
          const isConnected = source.status === "connected";
          const isSyncing = source.status === "syncing";
          return (
            <List.Item
              actions={[
                isConnected ? (
                  <Button
                    key="disconnect"
                    size="small"
                    onClick={() => {
                      onDisconnect(source.id);
                    }}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    key="connect"
                    type="primary"
                    size="small"
                    onClick={() => {
                      onConnect(source.id);
                    }}
                  >
                    Connect
                  </Button>
                ),
                onSync && isConnected ? (
                  <Button
                    key="sync"
                    size="small"
                    loading={isSyncing}
                    onClick={() => {
                      onSync(source.id);
                    }}
                  >
                    Sync
                  </Button>
                ) : null,
              ].filter(Boolean)}
            >
              <Space direction="vertical" size={2}>
                <Space size={8}>
                  <Text strong>{source.name}</Text>
                  {source.type ? <Tag>{source.type}</Tag> : null}
                  <Tag color={statusColorMap[source.status]}>
                    {source.status}
                  </Tag>
                </Space>
                {source.description ? (
                  <Text type="secondary">{source.description}</Text>
                ) : null}
                {source.lastSyncedAt ? (
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Last synced: {source.lastSyncedAt.toLocaleString()}
                  </Text>
                ) : null}
              </Space>
            </List.Item>
          );
        }}
      />
    </Card>
  );
}
