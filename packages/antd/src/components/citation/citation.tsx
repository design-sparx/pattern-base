import { LinkOutlined } from "@ant-design/icons";
import { Badge, Button, Card, Space, Tag, Typography } from "antd";
import { useState } from "react";

import type {
  CitationProps,
  CitationsListProps,
  InlineCitationProps,
} from "@ai-ui/core";

const { Text, Paragraph } = Typography;

export function Citation({ citation }: CitationProps) {
  const [expanded, setExpanded] = useState(false);
  const { source, url, snippet, relevance = 1 } = citation;

  const getColor = (score: number) => {
    if (score >= 0.8) return "green";
    if (score >= 0.5) return "orange";
    return "default";
  };

  const getLabel = (score: number) => {
    if (score >= 0.8) return "High";
    if (score >= 0.5) return "Medium";
    return "Low";
  };

  return (
    <Card size="small" style={{ marginBottom: 8 }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Space direction="vertical" size={2}>
            <Space>
              <Text strong style={{ color: "#1890ff" }}>
                {source}
              </Text>
              <Tag color={getColor(relevance)}>
                {getLabel(relevance)} Relevance
              </Tag>
            </Space>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 12 }}
              >
                <LinkOutlined />{" "}
                {url.length > 60 ? `${url.substring(0, 60)}...` : url}
              </a>
            ) : null}
          </Space>
          <Button
            type="link"
            size="small"
            onClick={() => {
              setExpanded(!expanded);
            }}
          >
            {expanded ? "Hide" : "View"} excerpt
          </Button>
        </div>

        {expanded ? (
          <div
            style={{
              borderLeft: "3px solid #1890ff",
              paddingLeft: 12,
              backgroundColor: "#fafafa",
              padding: "8px 12px",
              borderRadius: 4,
            }}
          >
            <Paragraph italic style={{ margin: 0, fontSize: 13 }}>
              &ldquo;{snippet}&rdquo;
            </Paragraph>
          </div>
        ) : null}
      </Space>
    </Card>
  );
}

export function CitationsList({
  citations,
  title = "Sources",
  maxVisible = 3,
}: CitationsListProps) {
  const [showAll, setShowAll] = useState(false);
  const display = showAll ? citations : citations.slice(0, maxVisible);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Space>
        <Text strong>{title}</Text>
        <Badge
          count={citations.length}
          style={{ backgroundColor: "#6b7280" }}
        />
      </Space>

      {display.map((c) => (
        <Citation key={c.id} citation={c} />
      ))}

      {citations.length > maxVisible && (
        <Button
          type="default"
          block
          size="small"
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          {showAll
            ? "Show fewer"
            : `Show ${String(citations.length - maxVisible)} more`}
        </Button>
      )}
    </Space>
  );
}

export function InlineCitation({
  citationNumber,
  source,
  url,
}: InlineCitationProps) {
  return (
    <sup>
      <a
        href={url ?? "#"}
        title={source}
        style={{
          background: "#1890ff",
          color: "#fff",
          padding: "0 4px",
          borderRadius: 4,
          fontSize: 10,
          textDecoration: "none",
          marginLeft: 2,
        }}
      >
        [{citationNumber}]
      </a>
    </sup>
  );
}
