import { Badge, Button, Card, Form, Spinner } from "react-bootstrap";

import type { InpaintingProps } from "@ai-ui/core";

export function Inpainting({
  content,
  regions,
  onRegionSelect,
  onApply,
  selectedRegionId,
  isProcessing = false,
  prompt = "",
  onPromptChange,
  title,
  variant: _variant = "segment",
}: Readonly<InpaintingProps>) {
  return (
    <Card>
      <Card.Body>
        <Card.Title className="fs-6">{title ?? "Edit Region"}</Card.Title>
        <p className="small">{content}</p>
        <div className="mb-3">
          <small className="text-muted d-block mb-2">
            Select a region to edit:
          </small>
          <div className="d-flex flex-wrap gap-1">
            {regions.map((region) => (
              <Badge
                key={region.id}
                bg={selectedRegionId === region.id ? "primary" : "light"}
                text={selectedRegionId === region.id ? "white" : "dark"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onRegionSelect(region.id);
                }}
              >
                {selectedRegionId === region.id ? "✓ " : ""}
                {region.label ?? `Region ${region.id}`}
              </Badge>
            ))}
          </div>
        </div>
        {selectedRegionId ? (
          <div>
            <Form.Control
              as="textarea"
              rows={2}
              size="sm"
              placeholder="Describe how to modify this region..."
              value={prompt}
              onChange={(e) => onPromptChange?.(e.target.value)}
              className="mb-2"
            />
            <Button
              variant="primary"
              size="sm"
              disabled={isProcessing}
              onClick={() => {
                onApply(selectedRegionId, prompt);
              }}
            >
              {isProcessing ? (
                <Spinner animation="border" size="sm" className="me-1" />
              ) : null}
              Apply Changes
            </Button>
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
}
