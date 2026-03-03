import { Badge, Button, Card, ListGroup } from "react-bootstrap";

import type { BranchesProps } from "@ai-ui/core";

export function Branches({
  branches,
  activeBranchId,
  onSelectBranch,
  onCreateBranch,
  title = "Branches",
  variant = "tree",
}: Readonly<BranchesProps>) {
  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">{title}</h6>
      </Card.Header>
      <ListGroup variant="flush">
        {branches.map((branch) => (
          <ListGroup.Item
            key={branch.id}
            action
            active={activeBranchId === branch.id}
            style={{
              marginLeft: variant === "tree" ? (branch.depth ?? 0) * 16 : 0,
            }}
            onClick={() => {
              onSelectBranch(branch.id);
            }}
            className="d-flex justify-content-between align-items-start"
          >
            <div>
              <div className="d-flex align-items-center gap-2">
                <strong className="small">{branch.label}</strong>
                {activeBranchId === branch.id ? (
                  <Badge bg="primary">Active</Badge>
                ) : null}
              </div>
              {branch.preview ? (
                <small className="text-muted">{branch.preview}</small>
              ) : null}
            </div>
            <Button
              size="sm"
              variant="link"
              className="p-0"
              onClick={(e) => {
                e.stopPropagation();
                onCreateBranch(branch.id);
              }}
            >
              Branch
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}
