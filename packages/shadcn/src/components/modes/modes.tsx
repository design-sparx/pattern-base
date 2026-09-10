import type { ModesProps } from "@patternbase/core";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function Modes({
  modes,
  selectedModeId,
  onModeChange,
  title,
  variant = "segmented",
}: ModesProps) {
  const selectedMode = modes.find((m) => m.id === selectedModeId);

  return (
    <div className="flex flex-col gap-3">
      {title ? <span className="text-sm font-semibold">{title}</span> : null}

      {variant === "tabs" ? (
        <Tabs
          value={selectedModeId}
          onValueChange={(id) => {
            if (id) onModeChange(id);
          }}
        >
          <TabsList>
            {modes.map((mode) => (
              <TabsTrigger
                key={mode.id}
                value={mode.id}
                disabled={mode.disabled}
              >
                {mode.icon ? <span>{mode.icon}</span> : null}
                {mode.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {selectedMode?.description ? (
            <TabsContent value={selectedModeId}>
              <Card className="p-2">
                <CardContent className="p-0">
                  <span className="text-muted-foreground text-xs">
                    {selectedMode.description}
                  </span>
                </CardContent>
              </Card>
            </TabsContent>
          ) : null}
        </Tabs>
      ) : (
        <>
          <ToggleGroup
            type="single"
            value={selectedModeId}
            onValueChange={(id) => {
              if (id) onModeChange(id);
            }}
            className="w-full"
          >
            {modes.map((mode) => (
              <ToggleGroupItem
                key={mode.id}
                value={mode.id}
                disabled={mode.disabled}
                className="flex-1"
              >
                {mode.icon ? <span>{mode.icon}</span> : null}
                {mode.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {selectedMode?.description ? (
            <Card className="p-2">
              <CardContent className="p-0">
                <span className="text-muted-foreground text-xs">
                  {selectedMode.description}
                </span>
              </CardContent>
            </Card>
          ) : null}
        </>
      )}
    </div>
  );
}
