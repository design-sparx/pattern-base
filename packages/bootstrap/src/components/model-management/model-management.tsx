import { Card, ListGroup, Badge, Form, Stack } from 'react-bootstrap';
import type { ModelManagementProps, ModelInfo } from '@ai-ui/core';

export function ModelManagement({
  models,
  selectedModelId,
  onSelectModel,
  showDetails = true,
  groupByProvider = true,
}: ModelManagementProps) {
  const grouped = groupByProvider
    ? models.reduce<Record<string, ModelInfo[]>>((acc, m) => {
        const key = m.provider;
        if (!acc[key]) acc[key] = [];
        acc[key]!.push(m);
        return acc;
      }, {})
    : { All: models };

  const renderModel = (model: ModelInfo) => (
    <ListGroup.Item
      key={model.id}
      action
      active={model.id === selectedModelId}
      onClick={() => onSelectModel(model.id)}
      className="d-flex flex-column gap-1"
    >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <Form.Check
            type="radio"
            checked={model.id === selectedModelId}
            onChange={() => onSelectModel(model.id)}
            className="pe-none"
          />
          <strong className="small">{model.name}</strong>
        </div>
        {model.capabilities && model.capabilities.length > 0 && (
          <div className="d-flex gap-1">
            {model.capabilities.slice(0, 3).map((c) => (
              <Badge key={c} bg="light" text="dark" className="small border">
                {c}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {showDetails && (
        <div className="small text-muted d-flex gap-3 ps-4">
          {model.description && <span>{model.description}</span>}
          {model.contextWindow && (
            <span>Context: {(model.contextWindow / 1000).toFixed(0)}k</span>
          )}
          {model.costPer1kInput != null && (
            <span>${model.costPer1kInput}/1k in</span>
          )}
        </div>
      )}
    </ListGroup.Item>
  );

  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">Model Selection</h6>
      </Card.Header>
      <Card.Body className="p-0">
        {Object.entries(grouped).map(([provider, providerModels]) => (
          <Stack key={provider} gap={0}>
            {groupByProvider && (
              <div className="px-3 py-2 bg-light border-bottom">
                <small className="fw-semibold text-uppercase text-muted">
                  {provider}
                </small>
              </div>
            )}
            <ListGroup variant="flush">
              {providerModels.map(renderModel)}
            </ListGroup>
          </Stack>
        ))}
      </Card.Body>
    </Card>
  );
}
