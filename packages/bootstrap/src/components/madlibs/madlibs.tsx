import { Button, Card, Form, Spinner } from "react-bootstrap";

import type { MadlibsProps } from "@ai-ui/core";

export function Madlibs({
  template,
  variables,
  values = {},
  onChange,
  onSubmit,
  title,
  description,
  isGenerating = false,
  showPreview = false,
  variant: _variant = "form",
}: Readonly<MadlibsProps>) {
  const filledTemplate = variables.reduce((acc, v) => {
    const val = values[v.id] ?? v.defaultValue ?? `{{${v.label}}}`;
    return acc.replace(new RegExp(`\\{\\{${v.id}\\}\\}`, "g"), val);
  }, template);

  return (
    <Card>
      <Card.Body>
        {title ? <Card.Title className="fs-6">{title}</Card.Title> : null}
        {description ? <p className="small text-muted">{description}</p> : null}
        {variables.map((v) => (
          <Form.Group key={v.id} className="mb-3">
            <Form.Label className="small fw-semibold">
              {v.label}
              {v.required ? <span className="text-danger"> *</span> : null}
            </Form.Label>
            {v.type === "select" && v.options ? (
              <Form.Select
                size="sm"
                value={values[v.id] ?? v.defaultValue ?? ""}
                onChange={(e) => {
                  onChange(v.id, e.target.value);
                }}
              >
                <option value="">{v.placeholder ?? "Select..."}</option>
                {v.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Form.Select>
            ) : v.type === "textarea" ? (
              <Form.Control
                as="textarea"
                rows={2}
                size="sm"
                placeholder={v.placeholder}
                value={values[v.id] ?? v.defaultValue ?? ""}
                onChange={(e) => {
                  onChange(v.id, e.target.value);
                }}
              />
            ) : (
              <Form.Control
                size="sm"
                type={v.type === "number" ? "number" : "text"}
                placeholder={v.placeholder}
                value={values[v.id] ?? v.defaultValue ?? ""}
                onChange={(e) => {
                  onChange(v.id, e.target.value);
                }}
              />
            )}
          </Form.Group>
        ))}
        {showPreview ? (
          <div className="bg-light mb-3 rounded border border-dashed p-2">
            <small className="text-muted d-block mb-1">Preview</small>
            <p className="small mb-0">{filledTemplate}</p>
          </div>
        ) : null}
        <Button
          variant="primary"
          size="sm"
          disabled={isGenerating}
          onClick={() => {
            onSubmit(values);
          }}
        >
          {isGenerating ? (
            <Spinner animation="border" size="sm" className="me-1" />
          ) : null}
          Generate
        </Button>
      </Card.Body>
    </Card>
  );
}
