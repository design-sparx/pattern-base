import { Button, Card, Form } from "react-bootstrap";

import type { PromptEnhancerProps } from "@patternbase/core";

export function PromptEnhancer({
  prompt,
  enhancedPrompt,
  onEnhance,
  onApply,
  onEnhancedPromptChange,
  isEnhancing = false,
  title = "Prompt Enhancer",
  variant = "split",
  showDiff = true,
}: Readonly<PromptEnhancerProps>) {
  const value = enhancedPrompt ?? "";

  if (variant === "inline") {
    return (
      <Card>
        <Card.Header>
          <h6 className="mb-0">{title}</h6>
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-column gap-2">
            <Form.Control as="textarea" rows={3} value={prompt} readOnly />
            <div className="d-flex gap-2">
              <Button
                size="sm"
                onClick={() => {
                  onEnhance(prompt);
                }}
                disabled={isEnhancing}
              >
                {isEnhancing ? "Enhancing..." : "Enhance"}
              </Button>
              {onApply ? (
                <Button
                  size="sm"
                  variant="outline-primary"
                  disabled={!value}
                  onClick={() => {
                    onApply(value);
                  }}
                >
                  Apply
                </Button>
              ) : null}
            </div>
            {value ? (
              <Form.Control
                as="textarea"
                rows={4}
                value={value}
                onChange={(e) => {
                  onEnhancedPromptChange?.(e.target.value);
                }}
                readOnly={!onEnhancedPromptChange}
              />
            ) : null}
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">{title}</h6>
      </Card.Header>
      <Card.Body>
        <div
          className="d-grid gap-2"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <div>
            <small className="fw-semibold">Original</small>
            <Form.Control as="textarea" rows={4} value={prompt} readOnly />
          </div>
          <div>
            <small className="fw-semibold">Enhanced</small>
            <Form.Control
              as="textarea"
              rows={4}
              value={value}
              placeholder="Enhanced prompt appears here"
              onChange={(e) => {
                onEnhancedPromptChange?.(e.target.value);
              }}
              readOnly={!onEnhancedPromptChange}
            />
          </div>
        </div>

        {showDiff && value ? (
          <small className="text-muted d-block mt-2">
            Diff preview: added context, constraints, and output formatting
            instructions.
          </small>
        ) : null}

        <div className="d-flex mt-2 gap-2">
          <Button
            size="sm"
            onClick={() => {
              onEnhance(prompt);
            }}
            disabled={isEnhancing}
          >
            {isEnhancing ? "Enhancing..." : "Enhance"}
          </Button>
          {onApply ? (
            <Button
              size="sm"
              variant="outline-primary"
              disabled={!value}
              onClick={() => {
                onApply(value);
              }}
            >
              Apply Enhanced Prompt
            </Button>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
}
