import { Send } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

import type { OpenInputProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function OpenInput({
  placeholder = "Ask anything...",
  onSubmit,
  isLoading = false,
  suggestions = [],
  maxLength,
  // TODO: multiModal & acceptedFileTypes are intentional no-ops (mantine parity).
}: OpenInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        {suggestions.length > 0 && !value ? (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  setValue(s);
                  textareaRef.current?.focus();
                }}
              >
                {s}
              </Badge>
            ))}
          </div>
        ) : null}

        <div className="flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            maxLength={maxLength}
            className="max-h-28 min-h-9 flex-1 resize-none"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                onClick={handleSubmit}
                disabled={!value.trim() || isLoading}
                aria-label={isLoading ? "Generating..." : "Send"}
              >
                <Send data-icon="inline-start" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isLoading ? "Generating..." : "Send"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
