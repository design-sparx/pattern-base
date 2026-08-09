import { Badge, Card, Stack } from "react-bootstrap";

import type { ColorProps } from "@patternbase/core";

export function Color({
  options,
  selectedColorId,
  onSelectColor,
  title = "AI Identity Color",
  showLabels = true,
  variant = "swatches",
}: Readonly<ColorProps>) {
  const renderSwatch = (option: {
    id: string;
    label: string;
    value: string;
  }) => {
    const selected = option.id === selectedColorId;
    return (
      <button
        key={option.id}
        type="button"
        onClick={() => {
          onSelectColor?.(option.id);
        }}
        style={{
          width: variant === "chips" ? 22 : 28,
          height: variant === "chips" ? 22 : 28,
          borderRadius: "50%",
          border: selected
            ? "2px solid var(--bs-emphasis-color)"
            : "1px solid var(--bs-border-color)",
          backgroundColor: option.value,
          cursor: onSelectColor ? "pointer" : "default",
        }}
        aria-label={option.label}
      />
    );
  };

  if (variant === "chips") {
    return (
      <Stack direction="horizontal" className="flex-wrap gap-2">
        {options.map((option) => (
          <Badge
            key={option.id}
            bg={option.id === selectedColorId ? "dark" : "secondary"}
            className="d-inline-flex align-items-center gap-2"
            style={{ cursor: onSelectColor ? "pointer" : "default" }}
            onClick={() => {
              onSelectColor?.(option.id);
            }}
          >
            {renderSwatch(option)}
            {option.label}
          </Badge>
        ))}
      </Stack>
    );
  }

  if (variant === "card") {
    return (
      <Card>
        <Card.Body>
          {title ? <Card.Title className="fs-6">{title}</Card.Title> : null}
          <Stack direction="horizontal" className="mb-2 flex-wrap gap-2">
            {options.map((option) => renderSwatch(option))}
          </Stack>
          {showLabels ? (
            <Stack gap={1}>
              {options.map((option) => (
                <small key={option.id} className="text-muted">
                  {option.label}: {option.value}
                </small>
              ))}
            </Stack>
          ) : null}
        </Card.Body>
      </Card>
    );
  }

  return (
    <Stack gap={2}>
      {title ? <strong>{title}</strong> : null}
      <Stack direction="horizontal" className="flex-wrap gap-2">
        {options.map((option) => renderSwatch(option))}
      </Stack>
      {showLabels ? (
        <Stack direction="horizontal" className="flex-wrap gap-2">
          {options.map((option) => (
            <small key={option.id} className="text-muted">
              {option.label}
            </small>
          ))}
        </Stack>
      ) : null}
    </Stack>
  );
}
