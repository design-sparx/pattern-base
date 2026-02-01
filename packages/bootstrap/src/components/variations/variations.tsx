import { Card, Row, Col, Nav, Tab, Badge } from 'react-bootstrap';
import type { VariationsProps } from '@ai-ui/core';

export function Variations({
  variations,
  selectedId,
  onSelect,
  layout = 'grid',
  columns = 2,
}: VariationsProps) {
  if (layout === 'tabs') {
    return (
      <Tab.Container defaultActiveKey={selectedId ?? variations[0]?.id}>
        <Nav variant="tabs" className="mb-3">
          {variations.map((v, i) => (
            <Nav.Item key={v.id}>
              <Nav.Link
                eventKey={v.id}
                onClick={() => onSelect?.(v.id)}
              >
                {v.label ?? `Variation ${i + 1}`}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          {variations.map((v) => (
            <Tab.Pane key={v.id} eventKey={v.id}>
              <div className="p-3 border rounded">{v.content}</div>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    );
  }

  if (layout === 'list') {
    return (
      <div className="d-flex flex-column gap-2">
        {variations.map((v, i) => (
          <Card
            key={v.id}
            className={selectedId === v.id ? 'border-primary' : ''}
            style={{ cursor: onSelect ? 'pointer' : 'default' }}
            onClick={() => onSelect?.(v.id)}
          >
            <Card.Body className="p-3">
              <div className="d-flex align-items-center gap-2 mb-1">
                <Badge bg="secondary" pill>{v.label ?? `#${i + 1}`}</Badge>
                {selectedId === v.id && <Badge bg="primary">Selected</Badge>}
              </div>
              <p className="mb-0 small">{v.content}</p>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }

  // grid
  return (
    <Row xs={1} md={columns} className="g-3">
      {variations.map((v, i) => (
        <Col key={v.id}>
          <Card
            className={`h-100 ${selectedId === v.id ? 'border-primary' : ''}`}
            style={{ cursor: onSelect ? 'pointer' : 'default' }}
            onClick={() => onSelect?.(v.id)}
          >
            <Card.Body>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Badge bg="secondary" pill>{v.label ?? `Variation ${i + 1}`}</Badge>
                {selectedId === v.id && <Badge bg="primary">Selected</Badge>}
              </div>
              <p className="mb-0 small">{v.content}</p>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
