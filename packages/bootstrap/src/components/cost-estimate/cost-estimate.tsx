import { Card, Table, Badge, ProgressBar } from 'react-bootstrap';
import type { CostEstimateProps } from '@ai-ui/core';

export function CostEstimate({
  breakdown,
  currency = 'USD',
  showTokens = true,
}: CostEstimateProps) {
  const formatCost = (cost: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    }).format(cost);

  const formatTokens = (tokens: number) =>
    new Intl.NumberFormat('en-US').format(tokens);

  const inputPct = breakdown.totalTokens > 0
    ? (breakdown.inputTokens / breakdown.totalTokens) * 100
    : 0;

  return (
    <Card>
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Cost Estimate</h6>
          <Badge bg="dark">{formatCost(breakdown.totalCost)}</Badge>
        </div>

        {breakdown.model && (
          <div className="text-muted small mb-2">Model: {breakdown.model}</div>
        )}

        {showTokens && (
          <>
            <ProgressBar className="mb-2" style={{ height: 8 }}>
              <ProgressBar
                variant="primary"
                now={inputPct}
                key={1}
                label=""
              />
              <ProgressBar
                variant="success"
                now={100 - inputPct}
                key={2}
                label=""
              />
            </ProgressBar>

            <Table size="sm" borderless className="mb-0 small">
              <tbody>
                <tr>
                  <td className="text-muted">Input tokens</td>
                  <td className="text-end">{formatTokens(breakdown.inputTokens)}</td>
                  <td className="text-end">{formatCost(breakdown.inputCost)}</td>
                </tr>
                <tr>
                  <td className="text-muted">Output tokens</td>
                  <td className="text-end">{formatTokens(breakdown.outputTokens)}</td>
                  <td className="text-end">{formatCost(breakdown.outputCost)}</td>
                </tr>
                <tr className="fw-semibold border-top">
                  <td>Total</td>
                  <td className="text-end">{formatTokens(breakdown.totalTokens)}</td>
                  <td className="text-end">{formatCost(breakdown.totalCost)}</td>
                </tr>
              </tbody>
            </Table>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
