import type { StreamOfThoughtProps } from "@patternbase/core";
import { Spinner } from "@/components/ui/spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const STEP_LABELS: Record<string, string> = {
  thinking: "Thinking",
  action: "Action",
  tool_call: "Tool Call",
  result: "Result",
};

export function StreamOfThought({
  steps,
  isStreaming = false,
  collapsible = true,
}: StreamOfThoughtProps) {
  if (collapsible) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Reasoning Process</span>
          {isStreaming ? <Spinner className="size-3.5" /> : null}
          <Badge variant="secondary">{steps.length} steps</Badge>
        </div>
        <Accordion type="multiple">
          {steps.map((step, index) => (
            <AccordionItem key={step.id} value={step.id}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {index + 1}
                  </Badge>
                  <span className="text-sm font-medium capitalize">
                    {STEP_LABELS[step.type] ?? step.type.replace(/_/g, " ")}
                  </span>
                  <span className="text-muted-foreground line-clamp-1 flex-1 text-xs">
                    {step.content.substring(0, 80)}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  <span className="whitespace-pre-wrap text-sm">
                    {step.content}
                  </span>
                  {step.metadata && Object.keys(step.metadata).length > 0 ? (
                    <code className="text-muted-foreground text-xs">
                      {JSON.stringify(step.metadata, null, 2)}
                    </code>
                  ) : null}
                  <span className="text-muted-foreground text-xs">
                    {new Date(step.timestamp).toLocaleString()}
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">Reasoning Process</span>
        {isStreaming ? <Spinner className="size-3.5" /> : null}
      </div>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex flex-col gap-2 rounded-lg border p-3"
        >
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {index + 1}
            </Badge>
            <span className="text-sm font-medium capitalize">
              {STEP_LABELS[step.type] ?? step.type.replace(/_/g, " ")}
            </span>
          </div>
          <span className="text-sm">{step.content}</span>
        </div>
      ))}
    </div>
  );
}
