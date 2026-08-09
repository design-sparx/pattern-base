import { Badge, Button, Card, Image, Stack } from "react-bootstrap";

import type { AvatarProps } from "@patternbase/core";

const statusClassMap = {
  online: "success",
  idle: "warning",
  offline: "secondary",
} as const;

const sizeMap = {
  small: 28,
  medium: 36,
  large: 48,
} as const;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.trim().charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function AvatarImage({
  name,
  imageUrl,
  size,
}: Readonly<{
  name: string;
  imageUrl?: string;
  size: "small" | "medium" | "large";
}>) {
  const pixelSize = sizeMap[size];
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        roundedCircle
        width={pixelSize}
        height={pixelSize}
        alt={name}
      />
    );
  }
  return (
    <div
      className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white"
      style={{ width: pixelSize, height: pixelSize, fontSize: 12 }}
    >
      {getInitials(name)}
    </div>
  );
}

export function Avatar({
  name,
  persona,
  imageUrl,
  badgeLabel,
  status = "online",
  size = "medium",
  variant = "inline",
  onSelect,
}: Readonly<AvatarProps>) {
  const statusClass = statusClassMap[status];

  const avatarNode = (
    <div className="position-relative">
      <AvatarImage name={name} imageUrl={imageUrl} size={size} />
      <span
        className={`position-absolute bottom-0 end-0 bg-${statusClass} rounded-circle border border-white`}
        style={{ width: 10, height: 10 }}
      />
    </div>
  );

  if (variant === "compact") {
    return (
      <Stack direction="horizontal" className="align-items-center gap-2">
        {avatarNode}
        <div>
          <div className="fw-semibold small">{name}</div>
          {persona ? <small className="text-muted">{persona}</small> : null}
        </div>
        {badgeLabel ? <Badge bg="secondary">{badgeLabel}</Badge> : null}
      </Stack>
    );
  }

  if (variant === "card") {
    return (
      <Card>
        <Card.Body>
          <Stack gap={2}>
            <Stack direction="horizontal" className="align-items-center gap-2">
              {avatarNode}
              <div>
                <div className="fw-semibold">{name}</div>
                {persona ? (
                  <small className="text-muted">{persona}</small>
                ) : null}
              </div>
            </Stack>
            <Stack direction="horizontal" className="align-items-center gap-2">
              {badgeLabel ? <Badge bg="secondary">{badgeLabel}</Badge> : null}
              <Badge bg={statusClass}>{status}</Badge>
              {onSelect ? (
                <Button size="sm" variant="link" onClick={onSelect}>
                  View profile
                </Button>
              ) : null}
            </Stack>
          </Stack>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Stack direction="horizontal" className="align-items-center gap-2">
      {avatarNode}
      <span className="small">{name}</span>
      {badgeLabel ? <Badge bg="secondary">{badgeLabel}</Badge> : null}
    </Stack>
  );
}
