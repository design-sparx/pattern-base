import { Button, Card, Spin, Typography } from "antd";
import { useState } from "react";

import type { ExpandProps } from "@patternbase/core";

const { Text } = Typography;

export function Expand({
  content,
  onExpand,
  expandedContent,
  isExpanding = false,
  title,
  variant = "button",
}: Readonly<ExpandProps>) {
  const [expanded, setExpanded] = useState(false);

  const displayContent =
    expanded && expandedContent ? expandedContent : content;

  if (variant === "accordion") {
    return (
      <Card size="small" title={title}>
        <Text style={{ fontSize: 13 }}>{displayContent}</Text>
        <div style={{ marginTop: 8 }}>
          {isExpanding ? (
            <Spin size="small" />
          ) : (
            <Button
              type="link"
              size="small"
              style={{ padding: 0 }}
              onClick={() => {
                if (!expanded) onExpand();
                setExpanded(!expanded);
              }}
            >
              {expanded ? "Show less" : "Expand"}
            </Button>
          )}
        </div>
      </Card>
    );
  }

  if (variant === "inline") {
    return (
      <span>
        {displayContent}
        {isExpanding ? (
          <Spin size="small" style={{ marginLeft: 4 }} />
        ) : !expanded ? (
          <Button
            type="link"
            size="small"
            style={{ padding: 0, marginLeft: 4 }}
            onClick={() => {
              onExpand();
              setExpanded(true);
            }}
          >
            ... expand
          </Button>
        ) : null}
      </span>
    );
  }

  return (
    <div>
      {title ? (
        <Text strong style={{ display: "block", marginBottom: 8 }}>
          {title}
        </Text>
      ) : null}
      <Text style={{ fontSize: 13 }}>{displayContent}</Text>
      <div style={{ marginTop: 8 }}>
        {isExpanding ? (
          <Spin size="small" />
        ) : !expanded ? (
          <Button
            size="small"
            onClick={() => {
              onExpand();
              setExpanded(true);
            }}
          >
            Expand content
          </Button>
        ) : null}
      </div>
    </div>
  );
}
