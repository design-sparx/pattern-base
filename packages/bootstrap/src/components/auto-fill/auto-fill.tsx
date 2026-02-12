import { useState } from "react";
import { Dropdown, Form, Spinner } from "react-bootstrap";

import type { AutoFillProps } from "@ai-ui/core";

export function AutoFill({
  suggestions,
  onSelect,
  onQueryChange,
  query: controlledQuery,
  isLoading = false,
  placeholder = "Start typing...",
  maxSuggestions,
}: Readonly<AutoFillProps>) {
  const [internalQuery, setInternalQuery] = useState("");
  const query = controlledQuery ?? internalQuery;
  const [open, setOpen] = useState(false);

  const visible = maxSuggestions
    ? suggestions.slice(0, maxSuggestions)
    : suggestions;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (controlledQuery === undefined) setInternalQuery(val);
    onQueryChange?.(val);
    setOpen(val.length > 0);
  };

  return (
    <div style={{ position: "relative" }}>
      <Form.Control
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onFocus={() => {
          if (query.length > 0) setOpen(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setOpen(false);
          }, 150);
        }}
      />
      {isLoading ? (
        <Spinner
          animation="border"
          size="sm"
          style={{ position: "absolute", right: 12, top: 10 }}
        />
      ) : null}
      {open && visible.length > 0 ? (
        <Dropdown.Menu show style={{ width: "100%", position: "absolute" }}>
          {visible.map((s) => (
            <Dropdown.Item
              key={s.id}
              onClick={() => {
                onSelect(s);
                setOpen(false);
              }}
            >
              <div>{s.text}</div>
              {s.source ? (
                <small className="text-muted">{s.source}</small>
              ) : null}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      ) : null}
    </div>
  );
}
