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
  desktop: 1024,
};

const entranceAnimation = "animate-[entrance_280ms_ease-out_both]";

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
    <Card className="overflow-hidden bg-[radial-gradient(#e8e8e8_1px,transparent_1px)] bg-[length:16px_16px] dark:bg-[radial-gradient(#3a3a3a_1px,transparent_1px)]">
      {/* Single-row toolbar: framework pills | preview/code toggle | devices */}
      <div className="mx-2 rounded-lg border bg-white/80 p-2 shadow-xl backdrop-blur-md dark:bg-neutral-900/80">
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
          <div className="flex min-h-[340px] items-center justify-center">
            <div
              className="relative px-2"
              style={{
                width: viewportWidths[viewport],
                maxWidth: "100%",
                transition: "width 200ms ease",
              }}
            >
              <div
                className={`preview-wrapper relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl ${entranceAnimation} dark:border-neutral-700 dark:bg-neutral-900`}
              >
                <div className="flex items-center gap-2 border-b border-neutral-200 bg-white px-4 py-2 dark:border-neutral-700 dark:bg-neutral-800">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400/90" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400/90" />
                    <span className="h-3 w-3 rounded-full bg-green-400/90" />
                  </div>
                  <div className="ml-3 flex-1 rounded-md bg-white px-3 py-1.5 text-xs text-neutral-500 dark:bg-neutral-700 dark:text-neutral-300">
                    patternbase.dev/patterns/{patternId}
                  </div>
                </div>
                <div className="bg-white p-4 dark:bg-neutral-900">
                  <PreviewErrorBoundary
                    key={`${patternId}-${framework}`}
                    patternId={patternId}
                  >
                    <ActiveSlot patternId={patternId} />
                  </PreviewErrorBoundary>
                </div>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-center text-xs">
            Rendered live from <code>@patternbase/{framework}</code>
          </p>
        </CardContent>
      )}
    </Card>
  );
}
