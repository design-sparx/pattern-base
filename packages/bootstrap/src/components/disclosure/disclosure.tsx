import { Badge, Alert } from 'react-bootstrap';
import type { DisclosureProps } from '@ai-ui/core';

const TYPE_LABELS: Record<DisclosureProps['type'], string> = {
  'ai-generated': 'AI Generated',
  'ai-assisted': 'AI Assisted',
  'ai-suggested': 'AI Suggested',
};

const TYPE_VARIANTS: Record<DisclosureProps['type'], string> = {
  'ai-generated': 'info',
  'ai-assisted': 'primary',
  'ai-suggested': 'secondary',
};

export function Disclosure({
  variant = 'badge',
  type,
  model,
  timestamp,
  customLabel,
}: DisclosureProps) {
  const label = customLabel ?? TYPE_LABELS[type];
  const color = TYPE_VARIANTS[type];

  if (variant === 'badge') {
    return (
      <Badge bg={color} className="d-inline-flex align-items-center gap-1">
        <span>{'\u2728'}</span>
        {label}
        {model && <span className="fw-normal opacity-75">({model})</span>}
      </Badge>
    );
  }

  if (variant === 'banner') {
    return (
      <Alert variant={color} className="py-2 px-3 mb-2 d-flex align-items-center gap-2 small">
        <span>{'\u2728'}</span>
        <span>{label}</span>
        {model && <span className="text-muted">- {model}</span>}
        {timestamp && (
          <span className="text-muted ms-auto">
            {new Date(timestamp).toLocaleDateString()}
          </span>
        )}
      </Alert>
    );
  }

  // inline
  return (
    <span className={`text-${color} small`}>
      {'\u2728'} {label}
      {model && <span className="text-muted"> ({model})</span>}
    </span>
  );
}
