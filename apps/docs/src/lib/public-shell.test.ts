import { describe, expect, it } from "vitest";

import {
  getNavCategories,
  isHomePath,
  isPatternsPath,
} from "@/lib/public-shell";

describe("public shell nav helpers", () => {
  it("builds nav categories with live counts and hrefs", () => {
    const cats = getNavCategories();

    expect(cats).toHaveLength(5);
    for (const cat of cats) {
      expect(cat.count).toBeGreaterThan(0);
      expect(cat.href).toBe(`/patterns/${cat.id}`);
    }
    const total = cats.reduce((sum, cat) => sum + cat.count, 0);
    expect(total).toBe(54);
    expect(cats[0]).toMatchObject({
      id: "prompt-actions",
      name: "Prompt Actions",
    });
  });

  it("isHomePath matches only the root", () => {
    expect(isHomePath("/")).toBe(true);
    expect(isHomePath("/patterns")).toBe(false);
    expect(isHomePath("/patterns/tuners/parameter-control")).toBe(false);
  });

  it("isPatternsPath matches any patterns route but not the root", () => {
    expect(isPatternsPath("/patterns")).toBe(true);
    expect(isPatternsPath("/patterns/tuners")).toBe(true);
    expect(isPatternsPath("/patterns/tuners/parameter-control")).toBe(true);
    expect(isPatternsPath("/")).toBe(false);
    expect(isPatternsPath("/about")).toBe(false);
  });
});
