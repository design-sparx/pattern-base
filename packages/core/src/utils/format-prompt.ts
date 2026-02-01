/**
 * Format a prompt with optional context and system instructions
 */
export function formatPrompt(
  userPrompt: string,
  options?: {
    systemPrompt?: string;
    context?: string;
    maxLength?: number;
  }
): string {
  let formatted = userPrompt.trim();

  if (options?.context) {
    formatted = `Context: ${options.context}\n\n${formatted}`;
  }

  if (options?.systemPrompt) {
    formatted = `${options.systemPrompt}\n\n${formatted}`;
  }

  if (options?.maxLength && formatted.length > options.maxLength) {
    formatted = formatted.slice(0, options.maxLength);
  }

  return formatted;
}
