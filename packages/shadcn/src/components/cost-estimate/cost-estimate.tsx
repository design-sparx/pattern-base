import type { CostEstimateProps } from "@patternbase/core";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const formatCost = (cost: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 4,
    maximumFractionDigits: 6,
  }).format(cost);

const formatTokens = (tokens: number) =>
  new Intl.NumberFormat("en-US").format(tokens);

export function CostEstimate({
  breakdown,
  currency = "USD",
  showTokens = true,
}: CostEstimateProps) {
  const inputPct =
    breakdown.totalTokens > 0
      ? Math.round((breakdown.inputTokens / breakdown.totalTokens) * 100)
      : 0;

  return (
    <Card className="p-3">
      <CardContent className="p-0">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Cost Estimate</span>
            <Badge variant="secondary">
              {formatCost(breakdown.totalCost, currency)}
            </Badge>
          </div>

          {breakdown.model ? (
            <span className="text-muted-foreground text-xs">
              Model: {breakdown.model}
            </span>
          ) : null}

          {showTokens ? (
            <>
              <Progress value={inputPct} />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-muted-foreground">
                      Input
                    </TableCell>
                    <TableCell className="text-right">
                      {formatTokens(breakdown.inputTokens)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCost(breakdown.inputCost, currency)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-muted-foreground">
                      Output
                    </TableCell>
                    <TableCell className="text-right">
                      {formatTokens(breakdown.outputTokens)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCost(breakdown.outputCost, currency)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="text-right font-bold">
                      {formatTokens(breakdown.totalTokens)}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCost(breakdown.totalCost, currency)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
