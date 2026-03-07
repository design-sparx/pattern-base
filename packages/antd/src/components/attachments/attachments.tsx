import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, Progress, Tag, theme, Typography, Upload } from "antd";

import type { AttachmentsProps } from "@ai-ui/core";

const { Text } = Typography;

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function Attachments({
  attachments,
  onAdd,
  onRemove,
  maxFiles,
  acceptedTypes,
  showPreview = false,
  variant = "full",
}: Readonly<AttachmentsProps>) {
  const { token } = theme.useToken();
  const canAdd = !maxFiles || attachments.length < maxFiles;

  return (
    <div>
      {canAdd ? (
        <Upload.Dragger
          multiple
          showUploadList={false}
          accept={acceptedTypes?.join(",")}
          beforeUpload={(_, fileList) => {
            onAdd(fileList as unknown as File[]);
            return false;
          }}
          style={{ marginBottom: 16 }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Drop files here or click to upload</p>
        </Upload.Dragger>
      ) : null}

      {attachments.map((a) => (
        <div
          key={a.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
            padding: 8,
            border: `1px solid ${token.colorBorder}`,
            borderRadius: 6,
          }}
        >
          {showPreview && a.previewUrl && variant === "full" ? (
            <img
              src={a.previewUrl}
              alt={a.name}
              style={{
                width: 40,
                height: 40,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          ) : null}
          <div style={{ flex: 1 }}>
            <Text strong style={{ fontSize: 13 }}>
              {a.name}
            </Text>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {formatSize(a.size)}
              </Text>
              {a.status === "error" ? <Tag color="error">Error</Tag> : null}
            </div>
            {a.status === "uploading" && a.progress != null ? (
              <Progress
                percent={a.progress}
                size="small"
                style={{ marginTop: 4 }}
              />
            ) : null}
          </div>
          <Button
            type="text"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => {
              onRemove(a.id);
            }}
          />
        </div>
      ))}
    </div>
  );
}
