"use client";

import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
} from "@tabler/icons-react";
import { useEffect } from "react";

import {
  LazyAntdSlot,
  LazyMantineSlot,
  LazyShadcnSlot,
  preloadInactiveSlots,
} from "./framework-slots";
import { useWorkbench } from "./workbench-context";

import { CodeBlock } from "@/components/preview/code-block";
import { PreviewErrorBoundary } from "@/components/preview/error-boundary";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  type Framework,
  tabToViewer,
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

const FRAMEWORK_SLOTS: Record<Framework, React.ElementType> = {
  mantine: LazyMantineSlot,
  antd: LazyAntdSlot,
  shadcn: LazyShadcnSlot,
};

const pillItem =
  "text-muted-foreground data-[state=on]:text-foreground rounded-full px-3";

const viewerItem =
  "text-muted-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-full px-4";

interface Snippets {
  mantine: string;
  antd: string;
  shadcn: string;
}

interface PreviewPaneProps {
  patternId: string;
  snippets: Snippets;
}

export function PreviewPane({
  patternId,
  snippets,
}: Readonly<PreviewPaneProps>) {
  const { framework, viewport, tab, setFramework, setViewport, setTab } =
    useWorkbench();
  const viewer = tabToViewer(tab);
  const ActiveSlot = FRAMEWORK_SLOTS[framework];

  // Warm the other framework chunks once, after first paint.
  useEffect(() => {
    preloadInactiveSlots(framework);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- warm once on mount only
  }, []);

  return (
    <Card className="overflow-hidden">
      {/* Single-row toolbar: framework pills | preview/code toggle | devices */}
      <div className="px-2">
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <ToggleGroup
            type="single"
            value={framework}
            onValueChange={(value) => {
              if (value) setFramework(value as Framework);
            }}
            variant="outline"
            className="w-fit gap-1"
            aria-label="Framework"
          >
            <ToggleGroupItem value="mantine" className={pillItem}>
              Mantine
            </ToggleGroupItem>
            <ToggleGroupItem value="antd" className={pillItem}>
              Ant Design
            </ToggleGroupItem>
            <ToggleGroupItem value="shadcn" className={pillItem}>
              shadcn/ui
            </ToggleGroupItem>
          </ToggleGroup>

          <ToggleGroup
            type="single"
            value={viewer}
            onValueChange={(value) => {
              if (value === "code" || value === "preview") setTab(value);
            }}
            variant="outline"
            className="w-fit gap-1"
            aria-label="Preview or code view"
          >
            <ToggleGroupItem value="preview" className={viewerItem}>
              Preview
            </ToggleGroupItem>
            <ToggleGroupItem value="code" className={viewerItem}>
              Code
            </ToggleGroupItem>
          </ToggleGroup>

          <ButtonGroup orientation="horizontal">
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
          </ButtonGroup>
        </div>
      </div>

      {viewer === "code" ? (
        <CardContent className="p-0">
          <div className="p-4">
            <CodeBlock
              code={snippets[framework]}
              filename={`${patternId}.tsx`}
            />
          </div>
        </CardContent>
      ) : (
        <CardContent className="p-0">
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
        </CardContent>
      )}
    </Card>
  );
}
