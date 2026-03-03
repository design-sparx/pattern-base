import { Badge, Button, Card, ListGroup, Stack } from "react-bootstrap";

import type { ConnectorsProps } from "@ai-ui/core";

const statusBadgeMap = {
  connected: "success",
  syncing: "info",
  error: "danger",
  disconnected: "secondary",
} as const;

export function Connectors({
  sources,
  onConnect,
  onDisconnect,
  onSync,
  title = "Connectors",
}: ConnectorsProps) {
  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">{title}</h6>
      </Card.Header>
      <ListGroup variant="flush">
        {sources.map((source) => {
          const isConnected = source.status === "connected";
          const isSyncing = source.status === "syncing";
          return (
            <ListGroup.Item key={source.id}>
              <Stack gap={1}>
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <strong className="small">{source.name}</strong>
                    {source.type ? (
                      <Badge bg="light" text="dark" className="border">
                        {source.type}
                      </Badge>
                    ) : null}
                    <Badge bg={statusBadgeMap[source.status]}>
                      {source.status}
                    </Badge>
                  </div>
                  <div className="d-flex gap-2">
                    {isConnected ? (
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => {
                          onDisconnect(source.id);
                        }}
                      >
                        Disconnect
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => {
                          onConnect(source.id);
                        }}
                      >
                        Connect
                      </Button>
                    )}
                    {onSync && isConnected ? (
                      <Button
                        size="sm"
                        variant="outline-primary"
                        disabled={isSyncing}
                        onClick={() => {
                          onSync(source.id);
                        }}
                      >
                        {isSyncing ? "Syncing..." : "Sync"}
                      </Button>
                    ) : null}
                  </div>
                </div>
                {source.description ? (
                  <small className="text-muted">{source.description}</small>
                ) : null}
                {source.lastSyncedAt ? (
                  <small className="text-muted">
                    Last synced: {source.lastSyncedAt.toLocaleString()}
                  </small>
                ) : null}
              </Stack>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Card>
  );
}
