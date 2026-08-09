import { Button, Card, Spinner, Stack } from "react-bootstrap";

import type { SampleResponseProps } from "@patternbase/core";

export function SampleResponse({
  sample,
  prompt,
  onGenerateSample,
  onRegenerateSample,
  onAcceptSample,
  isGenerating = false,
  title = "Sample Response",
  variant = "card",
}: Readonly<SampleResponseProps>) {
  if (variant === "inline") {
    return (
      <Stack gap={2}>
        <div className="d-flex align-items-center gap-2">
          <strong>{title}</strong>
          <Button size="sm" onClick={onGenerateSample} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Sample"}
          </Button>
        </div>
        {sample ? <small className="text-muted">{sample}</small> : null}
      </Stack>
    );
  }

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <h6 className="mb-0">{title}</h6>
        <div className="d-flex gap-2">
          <Button size="sm" onClick={onGenerateSample} disabled={isGenerating}>
            Sample
          </Button>
          {onRegenerateSample ? (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={onRegenerateSample}
              disabled={isGenerating}
            >
              Regenerate
            </Button>
          ) : null}
          {onAcceptSample ? (
            <Button
              variant="success"
              size="sm"
              onClick={onAcceptSample}
              disabled={!sample || isGenerating}
            >
              Generate Full
            </Button>
          ) : null}
        </div>
      </Card.Header>
      <Card.Body>
        {prompt ? (
          <small className="text-muted d-block mb-2">Prompt: {prompt}</small>
        ) : null}
        {isGenerating ? (
          <div className="d-flex align-items-center gap-2">
            <Spinner animation="border" size="sm" />
            <small className="text-muted">Generating sample...</small>
          </div>
        ) : sample ? (
          <p className="small mb-0">{sample}</p>
        ) : (
          <small className="text-muted">
            Generate a short preview response before running the full output.
          </small>
        )}
      </Card.Body>
    </Card>
  );
}
