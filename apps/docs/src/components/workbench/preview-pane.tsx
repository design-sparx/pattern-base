"use client";

import {
  IconCheck,
  IconCopy,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconDownload,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

import {
  LazyAntdSlot,
  LazyBootstrapSlot,
  LazyShadcnSlot,
  preloadInactiveSlots,
} from "./framework-slots";
import { useWorkbench } from "./workbench-context";

import { PreviewErrorBoundary } from "@/components/preview/error-boundary";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  type Framework,
  type Viewport,
  VIEWPORTS,
} from "@/lib/workbench-params";

const viewportIcons: Record<Viewport, React.ElementType> = {
  mobile: IconDeviceMobile,
  tablet: IconDeviceTablet,
  desktop: IconDeviceDesktop,
};

const viewportWidths: Record<Viewport, number | undefined> = {
  mobile: 375,
  tablet: 768,
  desktop: undefined,
};

const INSTALL_COMMANDS: Record<Framework, string> = {
  bootstrap: "pnpm add react-bootstrap bootstrap",
  antd: "pnpm add antd @ant-design/icons",
  shadcn: "pnpm add @patternbase/shadcn tailwindcss",
};

const FRAMEWORK_SLOTS: Record<Framework, React.ElementType> = {
  bootstrap: LazyBootstrapSlot,
  antd: LazyAntdSlot,
  shadcn: LazyShadcnSlot,
};

export function PreviewPane({ patternId }: Readonly<{ patternId: string }>) {
  const { framework, viewport, setFramework, setViewport } = useWorkbench();
  const ActiveSlot = FRAMEWORK_SLOTS[framework];
  const [installOpened, setInstallOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  // Warm the other framework chunks once, after first paint.
  useEffect(() => {
    preloadInactiveSlots(framework);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- warm once on mount only
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(INSTALL_COMMANDS[framework]);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="overflow-hidden rounded-md border">
      {/* Toolbar */}
      <div className="flex w-full flex-nowrap items-center justify-between border-b px-3 py-1">
        <div className="flex items-center gap-1">
          <TooltipProvider>
            {VIEWPORTS.map((vp) => {
              const Icon = viewportIcons[vp];
              const label = vp.charAt(0).toUpperCase() + vp.slice(1);
              return (
                <Tooltip key={vp}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewport === vp ? "secondary" : "ghost"}
                      size="icon-sm"
                      aria-label={label}
                      aria-pressed={viewport === vp}
                      onClick={() => {
                        setViewport(vp);
                      }}
                    >
                      <Icon size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>

        <Popover open={installOpened} onOpenChange={setInstallOpened}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              aria-expanded={installOpened}
              onClick={() => {
                setInstallOpened((open) => !open);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape" && installOpened) {
                  setInstallOpened(false);
                }
              }}
            >
              <IconDownload size={14} />
              Install
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" sideOffset={4} className="w-80">
            <div className="flex items-center justify-between gap-2">
              <code className="flex-1 break-all text-sm">
                {INSTALL_COMMANDS[framework]}
              </code>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={copied ? "Copied!" : "Copy install command"}
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <IconCheck size={14} />
                      ) : (
                        <IconCopy size={14} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copied ? "Copied!" : "Copy"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Framework selector */}
      <div className="flex w-full items-center justify-center border-b py-2">
        <ToggleGroup
          type="single"
          value={framework}
          onValueChange={(value) => {
            if (value) setFramework(value as Framework);
          }}
          className="flex w-fit items-center gap-0 rounded-md"
        >
          <ToggleGroupItem value="bootstrap">Bootstrap</ToggleGroupItem>
          <ToggleGroupItem value="antd">Ant Design</ToggleGroupItem>
          <ToggleGroupItem value="shadcn">shadcn/ui</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Live preview */}
      <div className="p-3">
        <div className="dot-grid-bg flex min-h-[180px] items-center justify-center rounded-md p-3">
          <div
            className="w-full"
            style={{
              maxWidth: viewportWidths[viewport],
              transition: "max-width 200ms ease",
            }}
          >
            <PreviewErrorBoundary
              key={`${patternId}-${framework}`}
              patternId={patternId}
            >
              <ActiveSlot patternId={patternId} />
            </PreviewErrorBoundary>
          </div>
        </div>
        <p className="text-muted-foreground text-center text-xs">
          Rendered live from <code>@patternbase/{framework}</code>
        </p>
      </div>
    </div>
  );
}
