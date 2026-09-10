import { useState } from "react";
import type { SharedVisionProps } from "@patternbase/core";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

const priorityVariant: Record<string, "default" | "secondary" | "destructive"> =
  {
    high: "destructive",
    medium: "secondary",
    low: "default",
  };

const contextVariant: Record<string, "default" | "secondary" | "destructive"> =
  {
    constraint: "destructive",
    assumption: "secondary",
    input: "default",
  };

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export function SharedVision({
  participants,
  goals,
  context,
  onAddGoal,
  onSelectParticipant,
  title = "Shared Vision",
  variant = "board",
}: SharedVisionProps) {
  const [newGoal, setNewGoal] = useState("");

  if (variant === "compact") {
    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold">{title}</span>
        <div className="flex flex-wrap items-center gap-2">
          {participants.map((p) => (
            <Badge
              key={p.id}
              variant={p.isActive ? "default" : "secondary"}
              className={onSelectParticipant ? "cursor-pointer" : ""}
              onClick={() => onSelectParticipant?.(p.id)}
            >
              {p.name}
            </Badge>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {goals.map((g) => (
            <div key={g.id} className="flex items-center gap-2">
              <Badge
                variant={priorityVariant[g.priority ?? "low"]}
                className="text-xs"
              >
                {g.priority ?? "low"}
              </Badge>
              <span className="text-sm">{g.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-semibold">{title}</span>
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3">
          <CardContent className="p-0">
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground text-xs font-semibold uppercase">
                Participants
              </span>
              {participants.map((p) => (
                <div
                  key={p.id}
                  className={`flex items-center gap-2 ${onSelectParticipant ? "cursor-pointer" : ""}`}
                  onClick={() => onSelectParticipant?.(p.id)}
                >
                  <Avatar size="sm">
                    <AvatarFallback>{getInitials(p.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{p.name}</span>
                    {p.role ? (
                      <span className="text-muted-foreground text-xs">
                        {p.role}
                      </span>
                    ) : null}
                  </div>
                  {p.isActive ? (
                    <Badge variant="default" className="text-xs">
                      active
                    </Badge>
                  ) : null}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="p-3">
          <CardContent className="p-0">
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground text-xs font-semibold uppercase">
                Goals
              </span>
              {goals.map((g) => (
                <div key={g.id} className="flex items-start gap-2">
                  <Badge
                    variant={priorityVariant[g.priority ?? "low"]}
                    className="text-xs"
                  >
                    {g.priority ?? "low"}
                  </Badge>
                  <span className="flex-1 text-sm">{g.text}</span>
                </div>
              ))}
              {onAddGoal ? (
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    className="h-7 text-xs"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newGoal.trim()) {
                        onAddGoal(newGoal.trim());
                        setNewGoal("");
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    className="h-7"
                    disabled={!newGoal.trim()}
                    onClick={() => {
                      if (newGoal.trim()) {
                        onAddGoal(newGoal.trim());
                        setNewGoal("");
                      }
                    }}
                  >
                    <Plus className="size-3" />
                  </Button>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <Card className="p-3">
          <CardContent className="p-0">
            <div className="flex flex-col gap-2">
              <span className="text-muted-foreground text-xs font-semibold uppercase">
                Context
              </span>
              {context.map((c) => (
                <div key={c.id} className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={contextVariant[c.type ?? "input"]}
                      className="text-xs"
                    >
                      {c.type ?? "input"}
                    </Badge>
                    <span className="text-xs font-medium">{c.label}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    {c.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
