import { Badge, Button, Card, ListGroup } from "react-bootstrap";

import type { DraftModeProps } from "@ai-ui/core";

export function DraftMode({
  drafts,
  activeDraftId,
  onSelectDraft,
  onRevertToDraft,
  onBranchFromDraft,
  title = "Draft Mode",
  variant = "list",
}: Readonly<DraftModeProps>) {
  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">{title}</h6>
      </Card.Header>
      <ListGroup variant="flush">
        {drafts.map((draft) => (
          <ListGroup.Item
            key={draft.id}
            action
            active={activeDraftId === draft.id}
            style={{
              marginLeft:
                variant === "timeline" ? Math.max(draft.number - 1, 0) * 8 : 0,
            }}
            onClick={() => {
              onSelectDraft(draft.id);
            }}
            className="d-flex justify-content-between align-items-start"
          >
            <div>
              <div className="d-flex align-items-center gap-2">
                <strong className="small">
                  {draft.label ?? `Draft ${draft.number}`}
                </strong>
                {activeDraftId === draft.id ? (
                  <Badge bg="primary">Active</Badge>
                ) : null}
              </div>
              {draft.preview ? (
                <small className="text-muted">{draft.preview}</small>
              ) : null}
            </div>
            <div className="d-flex gap-2">
              <Button
                size="sm"
                variant="link"
                className="p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onRevertToDraft(draft.id);
                }}
              >
                Revert
              </Button>
              {onBranchFromDraft ? (
                <Button
                  size="sm"
                  variant="link"
                  className="p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBranchFromDraft(draft.id);
                  }}
                >
                  Branch
                </Button>
              ) : null}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}
