import type { ModelInfo, ModelManagementProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export function ModelManagement({
  models,
  selectedModelId,
  onSelectModel,
  showDetails = true,
  groupByProvider = true,
}: ModelManagementProps) {
  const grouped = groupByProvider
    ? models.reduce<Record<string, ModelInfo[]>>((acc, m) => {
        const key = m.provider;
        if (!acc[key]) acc[key] = [];
        acc[key].push(m);
        return acc;
      }, {})
    : { All: models };

  return (
    <Card className="p-3">
      <CardContent className="flex flex-col gap-3 p-0">
        <span className="text-sm font-semibold">Model Selection</span>
        <RadioGroup value={selectedModelId} onValueChange={onSelectModel}>
          <div className="flex flex-col gap-3">
            {Object.entries(grouped).map(([provider, providerModels]) => (
              <div key={provider}>
                {groupByProvider ? (
                  <span className="text-muted-foreground mb-2 block text-xs font-bold uppercase">
                    {provider}
                  </span>
                ) : null}
                <div className="flex flex-col gap-2">
                  {providerModels.map((model) => (
                    <Card
                      key={model.id}
                      className={cn(
                        "cursor-pointer p-2",
                        model.id === selectedModelId &&
                          "bg-violet-50 dark:bg-violet-950/30",
                      )}
                      onClick={() => {
                        onSelectModel(model.id);
                      }}
                    >
                      <CardContent className="flex items-start justify-between p-0">
                        <div className="flex items-start gap-2">
                          <RadioGroupItem value={model.id} className="mt-0.5" />
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-semibold">
                              {model.name}
                            </span>
                            {showDetails && model.description ? (
                              <span className="text-muted-foreground text-xs">
                                {model.description}
                              </span>
                            ) : null}
                            {showDetails ? (
                              <div className="flex items-center gap-2">
                                {model.contextWindow ? (
                                  <span className="text-muted-foreground text-xs">
                                    {(model.contextWindow / 1000).toFixed(0)}k
                                    ctx
                                  </span>
                                ) : null}
                                {model.costPer1kInput !== undefined ? (
                                  <span className="text-muted-foreground text-xs">
                                    ${model.costPer1kInput}/1k in
                                  </span>
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {model.capabilities ? (
                          <div className="flex gap-1">
                            {model.capabilities.slice(0, 2).map((c) => (
                              <Badge
                                key={c}
                                variant="secondary"
                                className="text-xs"
                              >
                                {c}
                              </Badge>
                            ))}
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
