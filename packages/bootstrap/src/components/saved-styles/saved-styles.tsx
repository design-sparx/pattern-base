import { useMemo, useState } from "react";
import { Badge, Button, Card, Form, ListGroup } from "react-bootstrap";

import type { SavedStylesProps } from "@patternbase/core";

export function SavedStyles({
  styles,
  selectedStyleId,
  onSelectStyle,
  onSaveStyle,
  onDeleteStyle,
  title = "Saved Styles",
  variant = "list",
  maxVisible,
}: Readonly<SavedStylesProps>) {
  const [name, setName] = useState("");
  const visibleStyles = useMemo(
    () => (maxVisible ? styles.slice(0, maxVisible) : styles),
    [maxVisible, styles],
  );

  const saveDisabled = !name.trim();

  const saveControls = (
    <div className="d-flex gap-2">
      <Form.Control
        size="sm"
        placeholder="Save current style as..."
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Button
        size="sm"
        disabled={saveDisabled}
        onClick={() => {
          onSaveStyle(name.trim());
          setName("");
        }}
      >
        Save
      </Button>
    </div>
  );

  if (variant === "cards") {
    return (
      <Card>
        <Card.Header>
          <h6 className="mb-0">{title}</h6>
        </Card.Header>
        <Card.Body className="d-flex flex-column gap-2">
          {saveControls}
          <div
            className="d-grid gap-2"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            }}
          >
            {visibleStyles.map((style) => (
              <Card
                key={style.id}
                className={
                  selectedStyleId === style.id ? "border-primary" : undefined
                }
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onSelectStyle(style.id);
                }}
              >
                <Card.Body className="px-3 py-2">
                  <div className="d-flex align-items-center mb-1 gap-2">
                    <strong className="small">{style.name}</strong>
                    {style.isDefault ? (
                      <Badge bg="primary">Default</Badge>
                    ) : null}
                  </div>
                  {style.description ? (
                    <small className="text-muted d-block">
                      {style.description}
                    </small>
                  ) : null}
                  {onDeleteStyle && !style.isDefault ? (
                    <Button
                      size="sm"
                      variant="link"
                      className="text-danger mt-1 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteStyle(style.id);
                      }}
                    >
                      Delete
                    </Button>
                  ) : null}
                </Card.Body>
              </Card>
            ))}
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">{title}</h6>
      </Card.Header>
      <Card.Body className="d-flex flex-column gap-2">
        {saveControls}
        <ListGroup>
          {visibleStyles.map((style) => (
            <ListGroup.Item
              key={style.id}
              action
              active={selectedStyleId === style.id}
              onClick={() => {
                onSelectStyle(style.id);
              }}
              className="d-flex justify-content-between align-items-start"
            >
              <div>
                <div className="d-flex align-items-center gap-2">
                  <strong className="small">{style.name}</strong>
                  {style.isDefault ? <Badge bg="primary">Default</Badge> : null}
                </div>
                {style.description ? (
                  <small className="text-muted">{style.description}</small>
                ) : null}
              </div>
              {onDeleteStyle && !style.isDefault ? (
                <Button
                  size="sm"
                  variant="link"
                  className="text-danger p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteStyle(style.id);
                  }}
                >
                  Delete
                </Button>
              ) : null}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
