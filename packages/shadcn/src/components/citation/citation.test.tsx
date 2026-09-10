import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { CitationItem } from "@patternbase/core";

import { Citation, CitationsList, InlineCitation } from "./citation";

const citations: CitationItem[] = [
  {
    id: "1",
    source: "Docs",
    url: "https://example.com/docs",
    snippet: "Alpha text",
    relevance: 0.9,
  },
  {
    id: "2",
    source: "Blog",
    url: "https://example.com/blog",
    snippet: "Beta text",
    relevance: 0.4,
  },
  { id: "3", source: "Wiki", snippet: "Gamma text", relevance: 0.2 },
  { id: "4", source: "News", snippet: "Delta text" },
];

describe("Citation", () => {
  it("toggles the excerpt", async () => {
    render(<Citation citation={citations[0]!} />);
    expect(screen.getByText(/High Relevance/)).toBeInTheDocument();
    expect(screen.queryByText(/Alpha text/)).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: /view excerpt/i }),
    );
    expect(screen.getByText(/Alpha text/)).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: /hide excerpt/i }),
    );
    expect(screen.queryByText(/Alpha text/)).not.toBeInTheDocument();
  });
});

describe("CitationsList", () => {
  it("shows only maxVisible and toggles the rest", async () => {
    render(<CitationsList citations={citations} maxVisible={3} />);
    expect(screen.getByText("Sources")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.queryByText("News")).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /show 1 more/i }));
    expect(screen.getByText("News")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /show fewer/i }));
    expect(screen.queryByText("News")).not.toBeInTheDocument();
  });
});

describe("InlineCitation", () => {
  it("renders the numbered link", () => {
    render(
      <InlineCitation
        citationNumber={3}
        source="Docs"
        url="https://example.com/docs"
      />,
    );
    const link = screen.getByRole("link", { name: "[3]" });
    expect(link).toHaveAttribute("href", "https://example.com/docs");
    expect(link).toHaveAttribute("title", "Docs");
  });
});
