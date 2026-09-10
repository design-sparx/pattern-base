import { RefreshCw } from "lucide-react";

import type { ConnectorsProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function statusColor(status: string) {
  if (status === "connected") return "bg-green-500";
  if (status === "syncing") return "bg-blue-500";
  if (status === "error") return "bg-red-500";
  return "bg-gray-400";
}

export function Connectors({
  sources,
  onConnect,
  onDisconnect,
  onSync,
  title,
  variant = "list",
}: ConnectorsProps) {
  const renderSource = (source: (typeof sources)[0]) => (
    <Card key={source.id} className="p-3">
      <CardContent className="flex items-start justify-between p-0">
        <div className="flex flex-1 flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{source.name}</span>
            <Badge variant="secondary" className="text-xs">
              <span
                className={`mr-1 inline-block size-1.5 rounded-full ${statusColor(source.status)}`}
              />
              {source.status}
            </Badge>
            {source.type ? (
              <Badge variant="secondary" className="text-xs">
                {source.type}
              </Badge>
            ) : null}
          </div>
          {source.description ? (
            <span className="text-muted-foreground text-xs">
              {source.description}
            </span>
          ) : null}
          {source.lastSyncedAt ? (
            <span className="text-muted-foreground text-xs">
              Last synced: {source.lastSyncedAt.toLocaleString()}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {onSync && source.status === "connected" ? (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                onSync(source.id);
              }}
            >
              <RefreshCw className="size-3" />
              Sync
            </Button>
          ) : null}
          {source.status === "disconnected" || source.status === "error" ? (
            <Button
              variant="secondary"
              size="xs"
              onClick={() => {
                onConnect(source.id);
              }}
            >
              Connect
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                onDisconnect(source.id);
              }}
            >
              Disconnect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col gap-3">
      {title ? <span className="text-sm font-semibold">{title}</span> : null}
      {variant === "cards" ? (
        <div className="grid grid-cols-2 gap-3">
          {sources.map(renderSource)}
        </div>
      ) : (
        <div className="flex flex-col gap-2">{sources.map(renderSource)}</div>
      )}
    </div>
  );
}
