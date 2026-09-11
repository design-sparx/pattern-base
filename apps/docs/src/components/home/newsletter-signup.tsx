"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface NewsletterSignupProps {
  title?: string;
  description?: string;
}

export function NewsletterSignup({
  title = "Interested in the future of AI UX?",
  description = "Get updates on new patterns, framework implementations, and best practices.",
}: NewsletterSignupProps) {
  return (
    <Card className="border-border bg-background mx-auto max-w-3xl p-8 text-center md:p-12">
      <Badge variant="outline" className="mb-3 font-mono">
        Newsletter
      </Badge>
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
      <form
        className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input type="email" placeholder="your@email.com" className="sm:w-80" />
        <Button type="submit" className="shrink-0">
          Subscribe
        </Button>
      </form>
    </Card>
  );
}
