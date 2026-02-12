import { useState } from "react";
import { Card, Col, Form, ListGroup, Row } from "react-bootstrap";

import type { TemplatesProps } from "@ai-ui/core";

export function Templates({
  templates,
  onSelect,
  layout = "grid",
  columns = 3,
  searchable = false,
  groupByCategory = false,
}: Readonly<TemplatesProps>) {
  const [search, setSearch] = useState("");

  const filtered = search
    ? templates.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.description?.toLowerCase().includes(search.toLowerCase()),
      )
    : templates;

  const grouped = groupByCategory
    ? filtered.reduce<Record<string, typeof filtered>>((acc, t) => {
        const cat = t.category ?? "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(t);
        return acc;
      }, {})
    : { "": filtered };

  const renderTemplate = (t: (typeof templates)[0]) => {
    if (layout === "list") {
      return (
        <ListGroup.Item
          key={t.id}
          action
          onClick={() => {
            onSelect(t);
          }}
        >
          <div className="d-flex align-items-center">
            {t.icon ? <span className="fs-5 me-2">{t.icon}</span> : null}
            <div>
              <div className="fw-semibold">{t.name}</div>
              {t.description ? (
                <small className="text-muted">{t.description}</small>
              ) : null}
            </div>
          </div>
        </ListGroup.Item>
      );
    }

    return (
      <Col key={t.id}>
        <Card
          className="h-100"
          style={{ cursor: "pointer" }}
          onClick={() => {
            onSelect(t);
          }}
        >
          <Card.Body>
            <Card.Title className="fs-6">
              {t.icon ? <span className="me-2">{t.icon}</span> : null}
              {t.name}
            </Card.Title>
            {t.description ? (
              <Card.Text className="text-muted small">
                {t.description}
              </Card.Text>
            ) : null}
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <div>
      {searchable ? (
        <Form.Control
          className="mb-3"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      ) : null}

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className={category ? "mb-4" : ""}>
          {category ? <h6 className="mb-2">{category}</h6> : null}
          {layout === "list" ? (
            <ListGroup>{items.map(renderTemplate)}</ListGroup>
          ) : (
            <Row xs={1} md={columns} className="g-3">
              {items.map(renderTemplate)}
            </Row>
          )}
        </div>
      ))}
    </div>
  );
}
