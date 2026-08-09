import { Button, Card, Form } from "react-bootstrap";

import type { FiltersProps } from "@patternbase/core";

export function Filters({
  groups,
  values,
  onChange,
  onClear,
  layout = "vertical",
  title,
}: Readonly<FiltersProps>) {
  const content = groups.map((group) => (
    <div key={group.id} className={layout === "horizontal" ? "" : "mb-3"}>
      <Form.Label className="fw-semibold small">{group.label}</Form.Label>

      {group.type === "checkbox" && group.options
        ? group.options.map((opt) => (
            <Form.Check
              key={opt.id}
              type="checkbox"
              label={
                opt.count != null ? `${opt.label} (${opt.count})` : opt.label
              }
              checked={
                Array.isArray(values[group.id])
                  ? (values[group.id] as string[]).includes(opt.value)
                  : false
              }
              onChange={(e) => {
                const current = (values[group.id] as string[]) ?? [];
                const next = e.target.checked
                  ? [...current, opt.value]
                  : current.filter((v) => v !== opt.value);
                onChange(group.id, next);
              }}
            />
          ))
        : null}

      {group.type === "radio" && group.options
        ? group.options.map((opt) => (
            <Form.Check
              key={opt.id}
              type="radio"
              name={group.id}
              label={opt.label}
              checked={values[group.id] === opt.value}
              onChange={() => {
                onChange(group.id, opt.value);
              }}
            />
          ))
        : null}

      {group.type === "range" ? (
        <Form.Range
          min={group.min ?? 0}
          max={group.max ?? 100}
          step={group.step ?? 1}
          value={(values[group.id] as number) ?? group.min ?? 0}
          onChange={(e) => {
            onChange(group.id, Number(e.target.value));
          }}
        />
      ) : null}

      {group.type === "select" && group.options ? (
        <Form.Select
          size="sm"
          value={(values[group.id] as string) ?? ""}
          onChange={(e) => {
            onChange(group.id, e.target.value);
          }}
        >
          <option value="">All</option>
          {group.options.map((opt) => (
            <option key={opt.id} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Form.Select>
      ) : null}
    </div>
  ));

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          {title ? (
            <Card.Title className="fs-6 mb-0">{title}</Card.Title>
          ) : null}
          {onClear ? (
            <Button variant="link" size="sm" onClick={onClear}>
              Clear all
            </Button>
          ) : null}
        </div>
        <div
          className={
            layout === "horizontal" ? "d-flex flex-wrap gap-4" : undefined
          }
        >
          {content}
        </div>
      </Card.Body>
    </Card>
  );
}
