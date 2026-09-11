import { cn } from "cn";
import { Avatar as AvatarPrimitive } from "radix-ui";
import * as React from "react";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentProps<typeof AvatarPrimitive.Root> & {
    size?: "default" | "sm" | "lg";
  }
>(function Avatar({ className, size = "default", ...props }, ref) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 select-none overflow-hidden rounded-full data-[size=lg]:size-10 data-[size=sm]:size-6",
        className,
      )}
      {...props}
    />
  );
});

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentProps<typeof AvatarPrimitive.Image>
>(function AvatarImage({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
});

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentProps<typeof AvatarPrimitive.Fallback>
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs",
        className,
      )}
      {...props}
    />
  );
});

const AvatarBadge = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span">
>(function AvatarBadge({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      data-slot="avatar-badge"
      className={cn(
        "bg-primary text-primary-foreground ring-background absolute bottom-0 right-0 z-10 inline-flex select-none items-center justify-center rounded-full ring-2",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className,
      )}
      {...props}
    />
  );
});

const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function AvatarGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2",
        className,
      )}
      {...props}
    />
  );
});

const AvatarGroupCount = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(function AvatarGroupCount({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="avatar-group-count"
      className={cn(
        "bg-muted text-muted-foreground ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3 relative flex size-8 shrink-0 items-center justify-center rounded-full text-sm ring-2 [&>svg]:size-4",
        className,
      )}
      {...props}
    />
  );
});

export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
};
