import { Trash2, Upload } from "lucide-react";

import type { AttachmentsProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${String(bytes)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function Attachments({
  attachments,
  onAdd,
  onRemove,
  maxFiles,
  showPreview = false,
}: Readonly<AttachmentsProps>) {
  const canAdd = !maxFiles || attachments.length < maxFiles;

  const handleFileInput = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = () => {
      const files = Array.from(input.files ?? []);
      if (files.length > 0) onAdd(files);
    };
    input.click();
  };

  return (
    <div className="flex flex-col gap-3">
      {canAdd ? (
        <button
          type="button"
          className="text-muted-foreground hover:bg-accent flex min-h-[60px] cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed p-4 text-sm"
          onClick={handleFileInput}
        >
          <Upload className="size-5 opacity-40" />
          Drop files here or click to upload
        </button>
      ) : null}

      {attachments.map((a) => (
        <div key={a.id} className="flex items-start gap-3">
          {showPreview && a.previewUrl ? (
            <img
              src={a.previewUrl}
              alt={a.name}
              className="size-10 rounded object-cover"
            />
          ) : null}
          <div className="flex flex-1 flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{a.name}</span>
              <Button
                variant="ghost"
                size="icon-xs"
                className="text-destructive hover:text-destructive"
                onClick={() => {
                  onRemove(a.id);
                }}
                aria-label={`Remove ${a.name}`}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs">
                {formatSize(a.size)}
              </span>
              {a.status === "error" ? (
                <Badge variant="destructive" className="text-xs">
                  Error
                </Badge>
              ) : null}
            </div>
            {a.status === "uploading" && a.progress !== undefined ? (
              <Progress value={a.progress} className="mt-1 h-1" />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
