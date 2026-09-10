import { Download, Trash2 } from "lucide-react";

import type { DataOwnershipProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataOwnership({
  items,
  onDelete,
  onExport,
  onDeleteAll,
  title = "Your Data",
  variant = "list",
}: DataOwnershipProps) {
  if (variant === "table") {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">{title}</span>
          <div className="flex items-center gap-2">
            {onExport ? (
              <Button variant="outline" size="sm" onClick={onExport}>
                <Download className="size-3.5" />
                Export
              </Button>
            ) : null}
            {onDeleteAll ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive"
                onClick={onDeleteAll}
              >
                <Trash2 className="size-3.5" />
                Delete All
              </Button>
            ) : null}
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data Type</TableHead>
              <TableHead>Retention</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium">{item.dataType}</span>
                    {item.description ? (
                      <span className="text-muted-foreground text-xs">
                        {item.description}
                      </span>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell>
                  {item.retention ? (
                    <Badge variant="secondary">{item.retention}</Badge>
                  ) : null}
                </TableCell>
                <TableCell>
                  {item.deletable && onDelete ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive size-7"
                      aria-label="Delete"
                      onClick={() => {
                        onDelete(item.id);
                      }}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{title}</span>
        <div className="flex items-center gap-2">
          {onExport ? (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="size-3.5" />
              Export
            </Button>
          ) : null}
          {onDeleteAll ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive"
              onClick={onDeleteAll}
            >
              <Trash2 className="size-3.5" />
              Delete All
            </Button>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <Card key={item.id} className="p-3">
            <CardContent className="p-0">
              <div className="flex items-start justify-between">
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="text-sm font-medium">{item.dataType}</span>
                  {item.description ? (
                    <span className="text-muted-foreground text-xs">
                      {item.description}
                    </span>
                  ) : null}
                  {item.retention ? (
                    <Badge variant="outline" className="w-fit text-xs">
                      Retention: {item.retention}
                    </Badge>
                  ) : null}
                </div>
                {item.deletable && onDelete ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive size-7"
                    aria-label="Delete"
                    onClick={() => {
                      onDelete(item.id);
                    }}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
