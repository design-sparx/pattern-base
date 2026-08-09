import { Badge, Button, Card, ProgressBar } from "react-bootstrap";

import type { AttachmentsProps } from "@patternbase/core";

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
  const canAdd = !maxFiles || attachments.length < maxFiles;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onAdd(Array.from(e.target.files));
      e.target.value = "";
    }
  };

  return (
    <div>
      {canAdd ? (
        <Card
          className="mb-3 border-dashed text-center"
          style={{ borderStyle: "dashed", cursor: "pointer" }}
        >
          <Card.Body className="py-3">
            <label style={{ cursor: "pointer", display: "block" }}>
              <div className="text-muted mb-1">
                Drop files here or click to upload
              </div>
              <Button variant="outline-primary" size="sm" as="span">
                Choose Files
              </Button>
              <input
                type="file"
                multiple
                hidden
                accept={acceptedTypes?.join(",")}
                onChange={handleFileChange}
              />
            </label>
          </Card.Body>
        </Card>
      ) : null}

      {attachments.map((a) => (
        <div
          key={a.id}
          className="d-flex align-items-center mb-2 gap-2 rounded border p-2"
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
          <div className="flex-grow-1">
            <div className="small fw-semibold">{a.name}</div>
            <div className="d-flex align-items-center gap-2">
              <small className="text-muted">{formatSize(a.size)}</small>
              {a.status === "error" ? <Badge bg="danger">Error</Badge> : null}
            </div>
            {a.status === "uploading" && a.progress != null ? (
              <ProgressBar
                now={a.progress}
                style={{ height: 4 }}
                className="mt-1"
              />
            ) : null}
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => {
              onRemove(a.id);
            }}
          >
            &times;
          </Button>
        </div>
      ))}
    </div>
  );
}
