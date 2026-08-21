import { Card, Col, Row, Spinner } from "react-bootstrap";

import type { GalleryProps } from "@patternbase/core";

export function Gallery({
  items,
  onSelect,
  onLoadMore,
  columns = 3,
  selectable = false,
  loading = false,
  emptyMessage = "No items to display",
}: Readonly<GalleryProps>) {
  if (items.length === 0 && !loading) {
    return <p className="text-muted py-4 text-center">{emptyMessage}</p>;
  }

  return (
    <div>
      <Row xs={1} md={columns} className="g-3">
        {items.map((item) => (
          <Col key={item.id}>
            <Card
              className="h-100"
              style={{
                cursor: selectable || onSelect ? "pointer" : undefined,
                borderColor: item.selected ? "var(--bs-primary)" : undefined,
                borderWidth: item.selected ? 2 : undefined,
              }}
              onClick={() => onSelect?.(item)}
            >
              {item.type === "image" && item.src ? (
                <Card.Img
                  variant="top"
                  src={item.src}
                  alt={item.alt ?? item.title ?? ""}
                  style={{ objectFit: "cover", height: 160 }}
                />
              ) : null}
              <Card.Body>
                {item.title ? (
                  <Card.Title className="fs-6">{item.title}</Card.Title>
                ) : null}
                {item.content ? (
                  <Card.Text className="small">{item.content}</Card.Text>
                ) : null}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {loading ? (
        <div className="py-3 text-center">
          <Spinner animation="border" size="sm" />
        </div>
      ) : null}

      {onLoadMore && !loading ? (
        <div className="mt-3 text-center">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={onLoadMore}
          >
            Load more
          </button>
        </div>
      ) : null}
    </div>
  );
}
