import { Save, Star, Trash2 } from "lucide-react";
import { useState } from "react";

import type { SavedStylesProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function SavedStyles({
  styles,
  selectedStyleId,
  onSelectStyle,
  onSaveStyle,
  onDeleteStyle,
  title,
  variant = "list",
  maxVisible,
}: SavedStylesProps) {
  const [saveName, setSaveName] = useState("");

  const displayed = maxVisible ? styles.slice(0, maxVisible) : styles;

  return (
    <div className="flex flex-col gap-3">
      {title ? <span className="text-sm font-semibold">{title}</span> : null}

      <div className="flex items-center gap-2">
        <Input
          placeholder="Style name..."
          value={saveName}
          onChange={(e) => {
            setSaveName(e.currentTarget.value);
          }}
          className="h-8 flex-1 text-sm"
        />
        <Button
          variant="outline"
          size="sm"
          disabled={!saveName.trim()}
          onClick={() => {
            if (saveName.trim()) {
              onSaveStyle(saveName.trim());
              setSaveName("");
            }
          }}
        >
          <Save className="size-3.5" />
          Save
        </Button>
      </div>

      {variant === "cards" ? (
        <div className="flex flex-col gap-2">
          {displayed.map((style) => (
            <Card
              key={style.id}
              className={
                selectedStyleId === style.id
                  ? "cursor-pointer p-3 ring-2 ring-violet-600"
                  : "cursor-pointer p-3"
              }
              onClick={() => {
                onSelectStyle(style.id);
              }}
            >
              <CardContent className="flex items-center justify-between p-0">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{style.name}</span>
                    {style.isDefault ? (
                      <Badge variant="secondary" className="text-xs">
                        <Star className="size-2.5" />
                        Default
                      </Badge>
                    ) : null}
                    {selectedStyleId === style.id ? (
                      <Badge variant="default" className="text-xs">
                        Active
                      </Badge>
                    ) : null}
                  </div>
                  {style.description ? (
                    <span className="text-muted-foreground text-xs">
                      {style.description}
                    </span>
                  ) : null}
                </div>
                {onDeleteStyle ? (
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteStyle(style.id);
                    }}
                    aria-label={`Delete ${style.name}`}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {displayed.map((style) => (
            <div key={style.id} className="flex items-center justify-between">
              <button
                type="button"
                className="flex flex-1 cursor-pointer items-center gap-2 text-left"
                onClick={() => {
                  onSelectStyle(style.id);
                }}
              >
                <span
                  className={
                    selectedStyleId === style.id
                      ? "text-sm font-semibold"
                      : "text-sm"
                  }
                >
                  {style.name}
                </span>
                {style.isDefault ? (
                  <Badge variant="secondary" className="text-xs">
                    Default
                  </Badge>
                ) : null}
                {selectedStyleId === style.id ? (
                  <Badge variant="default" className="text-xs">
                    Active
                  </Badge>
                ) : null}
              </button>
              {onDeleteStyle ? (
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-destructive hover:text-destructive"
                  onClick={() => {
                    onDeleteStyle(style.id);
                  }}
                  aria-label={`Delete ${style.name}`}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
