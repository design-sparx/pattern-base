import {
  Badge,
  Button,
  Card,
  ListGroup,
  ProgressBar,
  Stack,
} from "react-bootstrap";

import type { ReferencesProps } from "@patternbase/core";

export function References({
  references,
  onSelectReference,
  onRemoveReference,
  title = "References",
  variant = "list",
  showRelevance = true,
}: Readonly<ReferencesProps>) {
  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">{title}</h6>
      </Card.Header>
      <ListGroup
        variant="flush"
        horizontal={variant === "cards" ? "md" : undefined}
        className={variant === "cards" ? "flex-wrap" : undefined}
      >
        {references.map((reference) => (
          <ListGroup.Item
            key={reference.id}
            className={
              variant === "cards" ? "col-md-6 border-bottom" : undefined
            }
            action={Boolean(onSelectReference)}
            active={Boolean(reference.selected)}
            onClick={() => {
              onSelectReference?.(reference.id);
            }}
          >
            <Stack gap={1}>
              <div className="d-flex justify-content-between align-items-start gap-2">
                <div className="d-flex align-items-center flex-wrap gap-2">
                  <strong className="small">{reference.title}</strong>
                  {reference.type ? (
                    <Badge bg="light" text="dark" className="border">
                      {reference.type}
                    </Badge>
                  ) : null}
                </div>
                {onRemoveReference ? (
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveReference(reference.id);
                    }}
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
              {reference.location ? (
                <a
                  href={reference.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="small text-decoration-none"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {reference.location}
                </a>
              ) : null}
              {reference.excerpt ? (
                <small className="text-muted">{reference.excerpt}</small>
              ) : null}
              {showRelevance && typeof reference.relevance === "number" ? (
                <ProgressBar
                  now={Math.round(reference.relevance * 100)}
                  style={{ height: 6 }}
                />
              ) : null}
            </Stack>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}
