import {
  Badge,
  Button,
  Card,
  ListGroup,
  ProgressBar,
  Spinner,
} from "react-bootstrap";

import type { SynthesisProps } from "@patternbase/core";

const insightTypeBg: Record<string, string> = {
  fact: "success",
  inference: "warning",
  theme: "info",
};

export function Synthesis({
  sources,
  insights,
  onSourceClick,
  onRegenerate,
  isProcessing = false,
  title,
  showSources = true,
  showConfidence = true,
  variant: _variant = "aggregated",
}: Readonly<SynthesisProps>) {
  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title className="fs-6 mb-0">{title ?? "Synthesis"}</Card.Title>
          {onRegenerate ? (
            <Button
              variant="outline-secondary"
              size="sm"
              disabled={isProcessing}
              onClick={onRegenerate}
            >
              {isProcessing ? (
                <Spinner animation="border" size="sm" className="me-1" />
              ) : null}
              Regenerate
            </Button>
          ) : null}
        </div>
        <ListGroup variant="flush">
          {insights.map((insight) => (
            <ListGroup.Item key={insight.id} className="px-0">
              <div className="d-flex align-items-start gap-2">
                {insight.type ? (
                  <Badge
                    bg={insightTypeBg[insight.type] ?? "secondary"}
                    className="flex-shrink-0"
                    style={{ fontSize: 10 }}
                  >
                    {insight.type}
                  </Badge>
                ) : null}
                <p className="small flex-grow-1 mb-0">{insight.text}</p>
              </div>
              <div className="d-flex align-items-center mt-1 gap-2">
                {showConfidence && insight.confidence != null ? (
                  <div style={{ width: 80 }}>
                    <ProgressBar
                      now={Math.round(insight.confidence * 100)}
                      variant={
                        insight.confidence >= 0.8
                          ? "success"
                          : insight.confidence >= 0.5
                            ? "warning"
                            : "danger"
                      }
                      style={{ height: 4 }}
                    />
                  </div>
                ) : null}
                {insight.sourceIds.length > 0 ? (
                  <div className="d-flex gap-1">
                    {insight.sourceIds.map((sid) => {
                      const src = sources.find((s) => s.id === sid);
                      return src ? (
                        <Badge
                          key={sid}
                          bg="light"
                          text="dark"
                          style={{
                            fontSize: 10,
                            cursor: onSourceClick ? "pointer" : undefined,
                          }}
                          onClick={() => onSourceClick?.(sid)}
                        >
                          {src.title}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                ) : null}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        {showSources && sources.length > 0 ? (
          <div className="mt-3">
            <small className="text-muted d-block mb-2">
              Sources ({sources.length})
            </small>
            {sources.map((src) => (
              <div
                key={src.id}
                className="bg-body-secondary mb-1 rounded px-2 py-1"
                style={{ cursor: onSourceClick ? "pointer" : undefined }}
                role={onSourceClick ? "button" : undefined}
                tabIndex={onSourceClick ? 0 : undefined}
                onClick={() => onSourceClick?.(src.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSourceClick?.(src.id);
                }}
              >
                <strong className="small">{src.title}</strong>
                {src.url ? (
                  <small className="text-muted ms-2">{src.url}</small>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
}
