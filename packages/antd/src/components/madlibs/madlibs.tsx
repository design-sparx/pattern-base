import { Button, Card, Input, Select, Space, Spin, Typography } from "antd";

import type { MadlibsProps } from "@ai-ui/core";

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

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
    <Card size="small" title={title}>
      {description ? (
        <Paragraph type="secondary" style={{ fontSize: 13 }}>
          {description}
        </Paragraph>
      ) : null}
      <Space direction="vertical" style={{ width: "100%" }} size={12}>
        {variables.map((v) => (
          <div key={v.id}>
            <Text
              strong
              style={{ fontSize: 12, display: "block", marginBottom: 4 }}
            >
              {v.label}
              {v.required ? <Text type="danger"> *</Text> : null}
            </Text>
            {v.type === "select" && v.options ? (
              <Select
                size="small"
                style={{ width: "100%" }}
                placeholder={v.placeholder}
                value={values[v.id] ?? v.defaultValue}
                onChange={(val) => {
                  onChange(v.id, val);
                }}
                options={v.options.map((opt) => ({
                  label: opt.label,
                  value: opt.value,
                }))}
              />
            ) : v.type === "textarea" ? (
              <TextArea
                rows={2}
                placeholder={v.placeholder}
                value={values[v.id] ?? v.defaultValue ?? ""}
                onChange={(e) => {
                  onChange(v.id, e.target.value);
                }}
              />
            ) : (
              <Input
                size="small"
                type={v.type === "number" ? "number" : "text"}
                placeholder={v.placeholder}
                value={values[v.id] ?? v.defaultValue ?? ""}
                onChange={(e) => {
                  onChange(v.id, e.target.value);
                }}
              />
            )}
          </div>
        ))}
      </Space>
      {showPreview ? (
        <div
          style={{
            marginTop: 12,
            padding: 8,
            background: "#fafafa",
            borderRadius: 6,
            border: "1px dashed #d9d9d9",
          }}
        >
          <Text
            type="secondary"
            style={{ fontSize: 11, display: "block", marginBottom: 4 }}
          >
            Preview
          </Text>
          <Text style={{ fontSize: 13 }}>{filledTemplate}</Text>
        </div>
      ) : null}
      <div style={{ marginTop: 12 }}>
        <Button
          type="primary"
          loading={isGenerating}
          onClick={() => {
            onSubmit(values);
          }}
        >
          Generate
        </Button>
        {isGenerating ? <Spin size="small" style={{ marginLeft: 8 }} /> : null}
      </div>
    </Card>
  );
}
