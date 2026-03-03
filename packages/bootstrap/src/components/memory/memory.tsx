import { useState } from "react";
import { Badge, Button, Card, Form, ListGroup, Stack } from "react-bootstrap";

import type { MemoryProps } from "@ai-ui/core";

export function Memory({
  memories,
  onEditMemory,
  onDeleteMemory,
  title = "Memory",
  variant = "list",
  showTimestamps = true,
}: Readonly<MemoryProps>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftValue, setDraftValue] = useState("");

  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">{title}</h6>
      </Card.Header>
      <ListGroup
        variant="flush"
        horizontal={variant === "cards" ? "md" : undefined}
        className={variant === "cards" ? "flex-wrap" : undefined}
      >
        {memories.map((memory) => {
          const isEditing = editingId === memory.id;
          return (
            <ListGroup.Item
              key={memory.id}
              className={
                variant === "cards" ? "col-md-6 border-bottom" : undefined
              }
            >
              <Stack gap={2}>
                <div className="d-flex justify-content-between align-items-start gap-2">
                  <div className="d-flex align-items-center flex-wrap gap-2">
                    <strong className="small">{memory.label}</strong>
                    {memory.category ? (
                      <Badge bg="light" text="dark" className="border">
                        {memory.category}
                      </Badge>
                    ) : null}
                    {memory.locked ? <Badge bg="warning">Locked</Badge> : null}
                  </div>
                  <div className="d-flex gap-2">
                    {isEditing ? (
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => {
                          onEditMemory(memory.id, draftValue);
                          setEditingId(null);
                          setDraftValue("");
                        }}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => {
                          setEditingId(memory.id);
                          setDraftValue(memory.value);
                        }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline-danger"
                      disabled={memory.locked}
                      onClick={() => {
                        onDeleteMemory(memory.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {isEditing ? (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={draftValue}
                    onChange={(e) => {
                      setDraftValue(e.currentTarget.value);
                    }}
                  />
                ) : (
                  <small className="text-muted">{memory.value}</small>
                )}

                {showTimestamps && memory.updatedAt ? (
                  <small className="text-muted">
                    Updated: {memory.updatedAt.toLocaleString()}
                  </small>
                ) : null}
              </Stack>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Card>
  );
}
