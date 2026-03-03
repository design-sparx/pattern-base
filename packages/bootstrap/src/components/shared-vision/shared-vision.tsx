import { useState } from "react";
import { Badge, Button, Card, Form, ListGroup, Stack } from "react-bootstrap";

import type { SharedVisionProps } from "@ai-ui/core";

const priorityBadgeMap = {
  high: "danger",
  medium: "warning",
  low: "primary",
} as const;

export function SharedVision({
  participants,
  goals,
  context,
  onAddGoal,
  onSelectParticipant,
  title = "Shared Vision",
  variant = "board",
}: Readonly<SharedVisionProps>) {
  const [goalDraft, setGoalDraft] = useState("");

  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">{title}</h6>
      </Card.Header>
      <Card.Body>
        <Stack gap={3}>
          <div className="d-flex flex-wrap gap-2">
            {participants.map((participant) => (
              <Badge
                key={participant.id}
                bg={participant.isActive ? "success" : "secondary"}
                style={{ cursor: onSelectParticipant ? "pointer" : "default" }}
                onClick={() => {
                  onSelectParticipant?.(participant.id);
                }}
              >
                {participant.name}
                {participant.role ? ` (${participant.role})` : ""}
              </Badge>
            ))}
          </div>

          <Card>
            <Card.Header className="py-2">
              <strong className="small">Goals</strong>
            </Card.Header>
            <ListGroup variant="flush">
              {goals.map((goal) => (
                <ListGroup.Item
                  key={goal.id}
                  className="d-flex align-items-center gap-2"
                >
                  <span className="small">{goal.text}</span>
                  {goal.priority ? (
                    <Badge bg={priorityBadgeMap[goal.priority]}>
                      {goal.priority}
                    </Badge>
                  ) : null}
                </ListGroup.Item>
              ))}
            </ListGroup>
            {onAddGoal ? (
              <Card.Footer className="d-flex gap-2">
                <Form.Control
                  size="sm"
                  value={goalDraft}
                  placeholder="Add shared goal..."
                  onChange={(e) => {
                    setGoalDraft(e.currentTarget.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    e.preventDefault();
                    if (!goalDraft.trim()) return;
                    onAddGoal(goalDraft.trim());
                    setGoalDraft("");
                  }}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    if (!goalDraft.trim()) return;
                    onAddGoal(goalDraft.trim());
                    setGoalDraft("");
                  }}
                >
                  Add
                </Button>
              </Card.Footer>
            ) : null}
          </Card>

          <Card>
            <Card.Header className="py-2">
              <strong className="small">
                {variant === "compact" ? "Context" : "Shared Context"}
              </strong>
            </Card.Header>
            <ListGroup variant="flush">
              {context.map((item) => (
                <ListGroup.Item key={item.id}>
                  <div className="d-flex align-items-center mb-1 gap-2">
                    <strong className="small">{item.label}</strong>
                    {item.type ? (
                      <Badge bg="light" text="dark" className="border">
                        {item.type}
                      </Badge>
                    ) : null}
                  </div>
                  <small className="text-muted">{item.value}</small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Stack>
      </Card.Body>
    </Card>
  );
}
