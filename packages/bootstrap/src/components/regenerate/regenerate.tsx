import { Button, Dropdown, Spinner } from 'react-bootstrap';
import type { RegenerateProps } from '@ai-ui/core';

export function Regenerate({
  onRegenerate,
  isRegenerating = false,
  variant = 'button',
  options,
}: RegenerateProps) {
  if (variant === 'dropdown' && options && options.length > 0) {
    return (
      <Dropdown>
        <Dropdown.Toggle
          variant="outline-secondary"
          size="sm"
          disabled={isRegenerating}
        >
          {isRegenerating ? (
            <>
              <Spinner animation="border" size="sm" className="me-1" />
              Regenerating...
            </>
          ) : (
            '\u21BB Regenerate'
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={onRegenerate}>Regenerate response</Dropdown.Item>
          <Dropdown.Divider />
          {options.map((opt, i) => (
            <Dropdown.Item key={i} onClick={opt.onSelect}>
              {opt.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  if (variant === 'icon') {
    return (
      <Button
        variant="link"
        size="sm"
        onClick={onRegenerate}
        disabled={isRegenerating}
        title="Regenerate"
        className="p-1"
      >
        {isRegenerating ? (
          <Spinner animation="border" size="sm" />
        ) : (
          <span style={{ fontSize: '1.2em' }}>{'\u21BB'}</span>
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="outline-secondary"
      size="sm"
      onClick={onRegenerate}
      disabled={isRegenerating}
    >
      {isRegenerating ? (
        <>
          <Spinner animation="border" size="sm" className="me-1" />
          Regenerating...
        </>
      ) : (
        '\u21BB Regenerate'
      )}
    </Button>
  );
}
