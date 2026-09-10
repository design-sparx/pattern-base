import { Info } from "lucide-react";

import type {
  ParameterControlItem,
  ParameterControlProps,
} from "@patternbase/core";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface MatrixControlProps {
  param: ParameterControlItem;
  onChange: (id: string, value: unknown) => void;
}

function MatrixControl({ param, onChange }: MatrixControlProps) {
  const matrixValue = (param.value ?? {}) as Record<string, number>;
  const xLabel = param.options?.[0]?.label ?? "X Axis";
  const yLabel = param.options?.[1]?.label ?? "Y Axis";
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-muted-foreground text-xs">{xLabel}</p>
        <Slider
          value={[matrixValue.x ?? 50]}
          onValueChange={(v) => {
            onChange(param.id, { ...matrixValue, x: v[0] ?? 50 });
          }}
        />
      </div>
      <div>
        <p className="text-muted-foreground text-xs">{yLabel}</p>
        <Slider
          value={[matrixValue.y ?? 50]}
          onValueChange={(v) => {
            onChange(param.id, { ...matrixValue, y: v[0] ?? 50 });
          }}
        />
      </div>
    </div>
  );
}

export function ParameterControl({
  parameters,
  onChange,
  title = "Parameters",
  layout = "vertical",
}: ParameterControlProps) {
  return (
    <div className="flex flex-col gap-4">
      {title ? <div className="text-base font-semibold">{title}</div> : null}

      <div
        className={cn(
          "flex flex-col gap-3",
          layout === "horizontal" && "flex-row flex-wrap",
        )}
      >
        {parameters.map((param) => (
          <div
            key={param.id}
            className={cn(
              "flex flex-col gap-2",
              layout === "horizontal" && "w-[200px]",
            )}
          >
            <div className="flex items-center gap-1 text-sm font-medium">
              {param.label}
              {param.description ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="opacity-50"
                        aria-label={`${param.label} info`}
                      >
                        <Info className="size-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{param.description}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
            </div>

            {param.type === "slider" ? (
              <>
                <Slider
                  min={param.min ?? 0}
                  max={param.max ?? 100}
                  step={param.step ?? 1}
                  value={[param.value as number]}
                  onValueChange={(v) => {
                    onChange(param.id, v[0] ?? 0);
                  }}
                />
                <p className="text-muted-foreground text-xs">
                  Current: {String(param.value)}
                </p>
              </>
            ) : null}

            {param.type === "toggle" ? (
              <Switch
                checked={param.value as boolean}
                onCheckedChange={(checked) => {
                  onChange(param.id, checked);
                }}
              />
            ) : null}

            {param.type === "select" ? (
              <Select
                value={param.value as string}
                onValueChange={(v) => {
                  onChange(param.id, v);
                }}
              >
                <SelectTrigger aria-label={param.label}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {param.options?.map((opt) => (
                      <SelectItem
                        key={String(opt.value)}
                        value={String(opt.value)}
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : null}

            {param.type === "matrix" ? (
              <MatrixControl param={param} onChange={onChange} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
