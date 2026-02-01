import { useState, useRef, KeyboardEvent } from 'react';
import { Form, Button, Badge, InputGroup, Stack } from 'react-bootstrap';
import type { OpenInputProps } from '@ai-ui/core';

export function OpenInput({
  placeholder = 'Ask anything...',
  onSubmit,
  isLoading = false,
  suggestions = [],
  maxLength,
}: OpenInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Stack gap={2}>
      {suggestions.length > 0 && !value && (
        <div className="d-flex flex-wrap gap-1">
          {suggestions.map((s, i) => (
            <Badge
              key={i}
              bg="light"
              text="dark"
              className="border"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setValue(s);
                textareaRef.current?.focus();
              }}
            >
              {s}
            </Badge>
          ))}
        </div>
      )}

      <InputGroup>
        <Form.Control
          as="textarea"
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          rows={1}
          maxLength={maxLength}
          style={{ resize: 'none' }}
        />
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!value.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-1" />
              Generating...
            </>
          ) : (
            'Send'
          )}
        </Button>
      </InputGroup>
    </Stack>
  );
}
