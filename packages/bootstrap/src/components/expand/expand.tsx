import { useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";

import type { ExpandProps } from "@ai-ui/core";

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
      <Card>
        <Card.Body>
          {title ? <Card.Title className="fs-6">{title}</Card.Title> : null}
          <Card.Text className="small">{displayContent}</Card.Text>
          {isExpanding ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <Button
              variant="link"
              size="sm"
              className="p-0"
              onClick={() => {
                if (!expanded) onExpand();
                setExpanded(!expanded);
              }}
            >
              {expanded ? "Show less" : "Expand"}
            </Button>
          )}
        </Card.Body>
      </Card>
    );
  }

  if (variant === "inline") {
    return (
      <span>
        {displayContent}
        {isExpanding ? (
          <Spinner animation="border" size="sm" className="ms-1" />
        ) : !expanded ? (
          <Button
            variant="link"
            size="sm"
            className="ms-1 p-0"
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
      {title ? <h6>{title}</h6> : null}
      <p className="small">{displayContent}</p>
      {isExpanding ? (
        <Spinner animation="border" size="sm" />
      ) : !expanded ? (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => {
            onExpand();
            setExpanded(true);
          }}
        >
          Expand content
        </Button>
      ) : null}
    </div>
  );
}
