import { Button, Card, Col, Empty, Row, Spin, theme, Typography } from "antd";

import type { GalleryProps } from "@ai-ui/core";

const { Text } = Typography;

export function Gallery({
  items,
  onSelect,
  onLoadMore,
  columns = 3,
  selectable = false,
  loading = false,
  emptyMessage = "No items to display",
}: Readonly<GalleryProps>) {
  const { token } = theme.useToken();
  if (items.length === 0 && !loading) {
    return <Empty description={emptyMessage} />;
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col key={item.id} xs={24} md={24 / columns}>
            <Card
              hoverable={selectable || Boolean(onSelect)}
              onClick={() => onSelect?.(item)}
              style={{
                height: "100%",
                borderColor: item.selected ? token.colorPrimary : undefined,
                borderWidth: item.selected ? 2 : undefined,
              }}
              cover={
                item.type === "image" && item.src ? (
                  <img
                    alt={item.alt ?? item.title ?? ""}
                    src={item.src}
                    style={{ objectFit: "cover", height: 160 }}
                  />
                ) : undefined
              }
            >
              {item.title ? <Text strong>{item.title}</Text> : null}
              {item.content ? (
                <div>
                  <Text style={{ fontSize: 13 }}>{item.content}</Text>
                </div>
              ) : null}
            </Card>
          </Col>
        ))}
      </Row>

      {loading ? (
        <div style={{ textAlign: "center", padding: 16 }}>
          <Spin size="small" />
        </div>
      ) : null}

      {onLoadMore && !loading ? (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Button size="small" onClick={onLoadMore}>
            Load more
          </Button>
        </div>
      ) : null}
    </div>
  );
}
