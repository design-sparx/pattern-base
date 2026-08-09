import { Badge, Card } from "react-bootstrap";

import type { PromptDetailsProps } from "@patternbase/core";

export function PromptDetails({
  prompt,
  details,
  timestamp,
  model,
  tokenCount,
  variant = "card",
}: Readonly<PromptDetailsProps>) {
  const metaItems = (
    <div className="d-flex mt-2 flex-wrap gap-2">
      {model ? <Badge bg="secondary">{model}</Badge> : null}
      {tokenCount != null ? (
        <Badge bg="outline-secondary" className="border">
          {tokenCount} tokens
        </Badge>
      ) : null}
      {timestamp ? (
        <small className="text-muted">{timestamp.toLocaleString()}</small>
      ) : null}
    </div>
  );

  const detailList = (
    <div className="mt-2">
      {details.map((d) => (
        <div key={d.id} className="d-flex mb-1 gap-2">
          <small className="text-muted fw-semibold">{d.label}:</small>
          {d.type === "badge" ? (
            <Badge bg="info">{d.value}</Badge>
          ) : d.type === "link" && d.url ? (
            <a
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="small"
            >
              {d.value}
            </a>
          ) : (
            <small>{d.value}</small>
          )}
        </div>
      ))}
    </div>
  );

  if (variant === "inline") {
    return (
      <div>
        <p className="small mb-1">{prompt}</p>
        {detailList}
        {metaItems}
      </div>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Card.Text className="small">{prompt}</Card.Text>
        {detailList}
        {metaItems}
      </Card.Body>
    </Card>
  );
}
