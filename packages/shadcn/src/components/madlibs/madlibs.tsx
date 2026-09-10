import { Loader2, Send } from "lucide-react";
import { useState } from "react";

import type { MadlibsProps, MadlibsVariable } from "@patternbase/core";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function renderVariableInput(
  variable: MadlibsVariable,
  value: string,
  onChange: (value: string) => void,
) {
  const placeholder =
    variable.placeholder ?? `Enter ${variable.label.toLowerCase()}...`;

  if (variable.type === "select" && variable.options) {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-label={variable.label}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {variable.options.map((o) => (
              <SelectItem key={o.value} value={String(o.value)}>
                {o.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  if (variable.type === "number") {
    return (
      <Input
        type="number"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
      />
    );
  }

  if (variable.type === "textarea") {
    return (
      <Textarea
        rows={2}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
      />
    );
  }

  return (
    <Input
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.currentTarget.value);
      }}
    />
  );
}

export function Madlibs({
  template,
  variables,
  values: externalValues,
  onChange,
  onSubmit,
  title,
  description,
  isGenerating = false,
  showPreview = true,
  variant: _variant = "form",
}: MadlibsProps) {
  const [localValues, setLocalValues] = useState<Record<string, string>>(
    Object.fromEntries(
      variables.map((v) => [
        v.id,
        externalValues?.[v.id] ?? v.defaultValue ?? "",
      ]),
    ),
  );

  const values = externalValues ?? localValues;

  const handleChange = (id: string, value: string) => {
    setLocalValues((prev) => ({ ...prev, [id]: value }));
    onChange(id, value);
  };

  const renderTemplate = () => {
    let result = template;
    variables.forEach((v) => {
      result = result.replace(`{{${v.id}}}`, values[v.id] ?? `[${v.label}]`);
    });
    return result;
  };

  const allFilled = variables
    .filter((v) => v.required)
    .every((v) => values[v.id]?.trim());

  return (
    <div className="flex flex-col gap-3">
      {title ? <span className="font-semibold">{title}</span> : null}
      {description ? (
        <span className="text-muted-foreground text-sm">{description}</span>
      ) : null}

      {showPreview ? (
        <Card>
          <CardContent className="p-3">
            <p className="text-sm italic">{renderTemplate()}</p>
          </CardContent>
        </Card>
      ) : null}

      {variables.map((variable) => (
        <div key={variable.id} className="flex flex-col gap-1.5">
          <Label>
            {variable.label}
            {variable.required ? (
              <span className="text-destructive"> *</span>
            ) : null}
          </Label>
          {renderVariableInput(variable, values[variable.id] ?? "", (value) => {
            handleChange(variable.id, value);
          })}
        </div>
      ))}

      <div className="flex justify-end">
        <Button
          onClick={() => {
            onSubmit(values);
          }}
          disabled={!allFilled || isGenerating}
          size="sm"
        >
          {isGenerating ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Send data-icon="inline-start" className="size-3.5" />
          )}
          Submit
        </Button>
      </div>
    </div>
  );
}
