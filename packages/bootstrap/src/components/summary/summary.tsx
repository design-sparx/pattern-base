import { useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";

import type { SummaryProps } from "@patternbase/core";

export function Summary({
  content,
  originalLength,
  summaryLength,
  onRegenerate,
  onCopy,
  onExpand,
  isGenerating = false,
  title,
  variant = "card",
}: Readonly<SummaryProps>) {
  const [collapsed, setCollapsed] = useState(variant === "collapsible");

  if (variant === "inline") {
    return (
      <div>
        {title ? <strong className="me-1">{title}:</strong> : null}
        {isGenerating ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <span>{content}</span>
        )}
      </div>
    );
  }

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          {title ? (
            <Card.Title className="fs-6 mb-0">{title}</Card.Title>
          ) : null}
          {originalLength != null && summaryLength != null ? (
            <small className="text-muted">
              {summaryLength} / {originalLength} chars
            </small>
          ) : null}
        </div>

        {isGenerating ? (
          <div className="py-3 text-center">
            <Spinner animation="border" size="sm" />
            <div className="text-muted small mt-1">Generating summary...</div>
          </div>
        ) : (
          <>
            {variant === "collapsible" && collapsed ? (
              <p className="small mb-2">
                {content.slice(0, 150)}
                {content.length > 150 ? "..." : ""}
              </p>
            ) : (
              <p className="small mb-2">{content}</p>
            )}
          </>
        )}
      </Card.Body>
      <Card.Footer className="d-flex gap-2">
        {onRegenerate ? (
          <Button
            variant="outline-primary"
            size="sm"
            onClick={onRegenerate}
            disabled={isGenerating}
          >
            Regenerate
          </Button>
        ) : null}
        {onCopy ? (
          <Button variant="outline-secondary" size="sm" onClick={onCopy}>
            Copy
          </Button>
        ) : null}
        {variant === "collapsible" ? (
          <Button
            variant="link"
            size="sm"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          >
            {collapsed ? "Expand" : "Collapse"}
          </Button>
        ) : null}
        {onExpand && variant !== "collapsible" ? (
          <Button variant="link" size="sm" onClick={onExpand}>
            View full
          </Button>
        ) : null}
      </Card.Footer>
    </Card>
  );
}
