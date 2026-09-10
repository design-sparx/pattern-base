import type { FiltersProps } from "@patternbase/core";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldLegend, FieldSet } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export function Filters({
  groups,
  values,
  onChange,
  onClear,
  layout = "vertical",
  title,
}: FiltersProps) {
  const hasValues = Object.values(values).some((v) =>
    Array.isArray(v) ? v.length > 0 : v !== undefined && v !== null && v !== "",
  );

  const renderGroup = (group: (typeof groups)[0]) => (
    <FieldSet key={group.id}>
      <FieldLegend variant="label" className="uppercase">
        {group.label}
      </FieldLegend>

      {group.type === "checkbox" && group.options ? (
        <div className="flex flex-col gap-1">
          {group.options.map((opt) => {
            const currentVal = values[group.id];
            const checked = Array.isArray(currentVal)
              ? (currentVal as string[]).includes(opt.value)
              : currentVal === opt.value;
            return (
              <Label
                key={opt.id}
                className="flex items-center gap-2 text-sm font-normal"
              >
                <Checkbox
                  checked={Boolean(checked)}
                  onCheckedChange={(c) => {
                    const raw = values[group.id];
                    const current = Array.isArray(raw) ? (raw as string[]) : [];
                    if (c) {
                      onChange(group.id, [...current, opt.value]);
                    } else {
                      onChange(
                        group.id,
                        current.filter((v) => v !== opt.value),
                      );
                    }
                  }}
                />
                <span>{opt.label}</span>
                {opt.count !== undefined ? (
                  <span className="text-muted-foreground text-xs">
                    ({opt.count})
                  </span>
                ) : null}
              </Label>
            );
          })}
        </div>
      ) : null}

      {group.type === "radio" && group.options ? (
        <RadioGroup
          value={String(values[group.id] ?? "")}
          onValueChange={(val) => {
            onChange(group.id, val);
          }}
        >
          <div className="flex flex-col gap-1">
            {group.options.map((opt) => (
              <Label
                key={opt.id}
                className="flex items-center gap-2 text-sm font-normal"
              >
                <RadioGroupItem value={opt.value} />
                {opt.label}
              </Label>
            ))}
          </div>
        </RadioGroup>
      ) : null}

      {group.type === "range" ? (
        <div className="flex flex-col gap-2">
          <Slider
            min={group.min ?? 0}
            max={group.max ?? 100}
            step={group.step ?? 1}
            value={[Number(values[group.id] ?? group.min ?? 0)]}
            onValueChange={(v) => {
              onChange(group.id, v[0] ?? 0);
            }}
          />
          <div className="flex justify-between">
            <span className="text-muted-foreground text-xs">
              {group.min ?? 0}
            </span>
            <span className="text-muted-foreground text-xs">
              {group.max ?? 100}
            </span>
          </div>
        </div>
      ) : null}

      {group.type === "select" && group.options ? (
        <Select
          value={String(values[group.id] ?? "")}
          onValueChange={(val) => {
            onChange(group.id, val);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {group.options.map((opt) => (
                <SelectItem key={opt.id} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ) : null}
    </FieldSet>
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        {title ? <span className="text-sm font-medium">{title}</span> : null}
        {onClear && hasValues ? (
          <Button variant="ghost" size="xs" onClick={onClear}>
            Clear all
          </Button>
        ) : null}
      </div>

      {layout === "horizontal" ? (
        <div className="flex flex-wrap items-start gap-4">
          {groups.map(renderGroup)}
        </div>
      ) : (
        <div className="flex flex-col gap-4">{groups.map(renderGroup)}</div>
      )}
    </div>
  );
}
