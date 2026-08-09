import { AutoComplete, Spin, Typography } from "antd";
import { useState } from "react";

import type { AutoFillProps } from "@patternbase/core";

const { Text } = Typography;

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

  const visible = maxSuggestions
    ? suggestions.slice(0, maxSuggestions)
    : suggestions;

  const options = visible.map((s) => ({
    value: s.text,
    label: (
      <div>
        <div>{s.text}</div>
        {s.source ? (
          <Text type="secondary" style={{ fontSize: 11 }}>
            {s.source}
          </Text>
        ) : null}
      </div>
    ),
    key: s.id,
    suggestion: s,
  }));

  return (
    <div style={{ position: "relative" }}>
      <AutoComplete
        style={{ width: "100%" }}
        options={options}
        value={query}
        placeholder={placeholder}
        onChange={(val) => {
          if (controlledQuery === undefined) setInternalQuery(val);
          onQueryChange?.(val);
        }}
        onSelect={(_, option) => {
          onSelect(
            (option as unknown as { suggestion: (typeof suggestions)[0] })
              .suggestion,
          );
        }}
      />
      {isLoading ? (
        <Spin
          size="small"
          style={{ position: "absolute", right: 12, top: 8 }}
        />
      ) : null}
    </div>
  );
}
