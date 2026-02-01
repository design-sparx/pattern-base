import { useState } from "react";
import { Badge, Button, Card, Collapse, Stack } from "react-bootstrap";

import type {
  CitationProps,
  CitationsListProps,
  InlineCitationProps,
} from "@ai-ui/core";

export function Citation({ citation }: CitationProps) {
  const [expanded, setExpanded] = useState(false);
  const { source, url, snippet, relevance = 1 } = citation;

  const getBadge = (score: number) => {
    if (score >= 0.8) return { variant: "success" as const, text: "High" };
    if (score >= 0.5) return { variant: "warning" as const, text: "Medium" };
    return { variant: "secondary" as const, text: "Low" };
  };

  const badge = getBadge(relevance);

  return (
    <Card className="mb-2">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="flex-grow-1">
            <div className="d-flex align-items-center mb-1 gap-2">
              <strong className="text-primary" style={{ fontSize: "14px" }}>
                {source}
              </strong>
              <Badge bg={badge.variant} className="small">
                {badge.text} Relevance
              </Badge>
            </div>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted small"
                style={{ textDecoration: "none" }}
              >
                {url.length > 60 ? `${url.substring(0, 60)}...` : url}
              </a>
            ) : null}
          </div>
          <Button
            variant="link"
            size="sm"
            onClick={() => {
              setExpanded(!expanded);
            }}
            className="text-decoration-none"
          >
            {expanded ? "Hide" : "View"} excerpt
          </Button>
        </div>

        <Collapse in={expanded}>
          <div>
            <blockquote className="border-start border-3 border-primary bg-light mb-0 p-3">
              <p className="small fst-italic mb-0">&ldquo;{snippet}&rdquo;</p>
            </blockquote>
          </div>
        </Collapse>
      </Card.Body>
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
    <Stack gap={2}>
      <div className="d-flex align-items-center gap-2">
        <h6 className="mb-0">{title}</h6>
        <Badge bg="secondary">{citations.length}</Badge>
      </div>

      {display.map((c) => (
        <Citation key={c.id} citation={c} />
      ))}

      {citations.length > maxVisible && (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => {
            setShowAll(!showAll);
          }}
          className="w-100"
        >
          {showAll
            ? "Show fewer"
            : `Show ${String(citations.length - maxVisible)} more`}
        </Button>
      )}
    </Stack>
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
        className="badge bg-primary text-decoration-none"
        style={{ fontSize: "10px", marginLeft: "2px" }}
      >
        [{citationNumber}]
      </a>
    </sup>
  );
}
