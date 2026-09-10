import type { VoiceAndToneProps } from "@patternbase/core";

import { Slider } from "@/components/ui/slider";

export function VoiceAndTone({
  axes,
  onChange,
  title = "Voice & Tone",
  showValues = false,
  variant = "sliders",
}: VoiceAndToneProps) {
  return (
    <div className="flex flex-col gap-4">
      {title ? <span className="text-sm font-semibold">{title}</span> : null}

      {axes.map((axis) => (
        <div key={axis.id} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{axis.label}</span>
            {showValues ? (
              <span className="text-muted-foreground text-xs">
                {axis.value}
              </span>
            ) : null}
          </div>
          {variant === "compact" ? (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground min-w-[60px] text-xs">
                {axis.leftLabel}
              </span>
              <Slider
                min={axis.min ?? 0}
                max={axis.max ?? 100}
                step={axis.step ?? 1}
                value={[axis.value]}
                onValueChange={(v) => {
                  onChange(axis.id, v[0] ?? 0);
                }}
                className="flex-1"
              />
              <span className="text-muted-foreground min-w-[60px] text-right text-xs">
                {axis.rightLabel}
              </span>
            </div>
          ) : (
            <>
              <Slider
                min={axis.min ?? 0}
                max={axis.max ?? 100}
                step={axis.step ?? 1}
                value={[axis.value]}
                onValueChange={(v) => {
                  onChange(axis.id, v[0] ?? 0);
                }}
              />
              <div className="flex justify-between">
                <span className="text-muted-foreground text-xs">
                  {axis.leftLabel}
                </span>
                <span className="text-muted-foreground text-xs">
                  {axis.rightLabel}
                </span>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
