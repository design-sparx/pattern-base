import type { AvatarProps } from "@patternbase/core";

import {
  Avatar as AvatarPrimitive,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

const sizeClass: Record<string, string> = {
  small: "size-6 text-xs",
  medium: "size-8 text-sm",
  large: "size-10 text-base",
};

const dotClass: Record<string, string> = {
  small: "size-2",
  medium: "size-2.5",
  large: "size-3.5",
};

const statusColor: Record<string, string> = {
  online: "bg-green-500",
  idle: "bg-orange-500",
  offline: "bg-gray-400",
};

const avatarSize = { small: "sm", medium: "default", large: "lg" } as const;

export function Avatar({
  name,
  persona,
  imageUrl,
  badgeLabel,
  status = "online",
  size = "medium",
  variant = "inline",
  onSelect,
}: AvatarProps) {
  const avatarEl = (
    <div className="relative inline-block">
      <AvatarPrimitive size={avatarSize[size]}>
        {imageUrl ? <AvatarImage src={imageUrl} alt={name} /> : null}
        <AvatarFallback className={sizeClass[size]}>
          {getInitials(name)}
        </AvatarFallback>
      </AvatarPrimitive>
      <span
        className={`ring-background absolute bottom-0 right-0 rounded-full ring-2 ${statusColor[status] ?? ""} ${dotClass[size] ?? ""}`}
      />
    </div>
  );

  if (variant === "compact") {
    return (
      <div
        className={`flex items-center gap-2 ${onSelect ? "cursor-pointer" : ""}`}
        role={onSelect ? "button" : undefined}
        tabIndex={onSelect ? 0 : undefined}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (onSelect && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onSelect();
          }
        }}
      >
        {avatarEl}
        <span className="text-sm font-medium">{name}</span>
        {badgeLabel ? <Badge variant="secondary">{badgeLabel}</Badge> : null}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <Card
        className={`${onSelect ? "cursor-pointer" : ""} p-4`}
        onClick={onSelect}
      >
        <CardContent className="p-0">
          <div className="flex flex-col items-center gap-2 text-center">
            {avatarEl}
            <div className="flex flex-col gap-1">
              <span className="font-semibold">{name}</span>
              {persona ? (
                <span className="text-muted-foreground text-sm">{persona}</span>
              ) : null}
              {badgeLabel ? (
                <Badge variant="secondary" className="text-sm">
                  {badgeLabel}
                </Badge>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      className={`flex items-center gap-3 ${onSelect ? "cursor-pointer" : ""}`}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (onSelect && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {avatarEl}
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium">{name}</span>
        {persona ? (
          <span className="text-muted-foreground text-xs">{persona}</span>
        ) : null}
        {badgeLabel ? <Badge variant="secondary">{badgeLabel}</Badge> : null}
      </div>
    </div>
  );
}
