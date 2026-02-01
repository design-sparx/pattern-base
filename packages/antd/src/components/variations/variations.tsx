import { Card, Row, Col, Tabs, Tag, Space, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import type { VariationsProps } from '@ai-ui/core';

const { Text } = Typography;

export function Variations({
  variations,
  selectedId,
  onSelect,
  layout = 'grid',
  columns = 2,
}: VariationsProps) {
  if (layout === 'tabs') {
    const items = variations.map((v, i) => ({
      key: v.id,
      label: v.label ?? `Variation ${i + 1}`,
      children: (
        <div style={{ padding: 16, border: '1px solid #f0f0f0', borderRadius: 8 }}>
          {v.content}
        </div>
      ),
    }));

    return (
      <Tabs
        activeKey={selectedId ?? variations[0]?.id}
        onChange={(key) => onSelect?.(key)}
        items={items}
      />
    );
  }

  if (layout === 'list') {
    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        {variations.map((v, i) => (
          <Card
            key={v.id}
            size="small"
            hoverable={!!onSelect}
            style={{
              borderColor: selectedId === v.id ? '#1890ff' : undefined,
              cursor: onSelect ? 'pointer' : 'default',
            }}
            onClick={() => onSelect?.(v.id)}
          >
            <Space direction="vertical" size={4} style={{ width: '100%' }}>
              <Space>
                <Tag>{v.label ?? `#${i + 1}`}</Tag>
                {selectedId === v.id && (
                  <Tag color="blue" icon={<CheckCircleOutlined />}>Selected</Tag>
                )}
              </Space>
              <Text style={{ fontSize: 13 }}>{v.content}</Text>
            </Space>
          </Card>
        ))}
      </Space>
    );
  }

  // grid
  return (
    <Row gutter={[16, 16]}>
      {variations.map((v, i) => (
        <Col key={v.id} xs={24} md={24 / columns}>
          <Card
            size="small"
            hoverable={!!onSelect}
            style={{
              height: '100%',
              borderColor: selectedId === v.id ? '#1890ff' : undefined,
              cursor: onSelect ? 'pointer' : 'default',
            }}
            onClick={() => onSelect?.(v.id)}
          >
            <Space direction="vertical" size={8} style={{ width: '100%' }}>
              <Space>
                <Tag>{v.label ?? `Variation ${i + 1}`}</Tag>
                {selectedId === v.id && (
                  <Tag color="blue" icon={<CheckCircleOutlined />}>Selected</Tag>
                )}
              </Space>
              <Text style={{ fontSize: 13 }}>{v.content}</Text>
            </Space>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
