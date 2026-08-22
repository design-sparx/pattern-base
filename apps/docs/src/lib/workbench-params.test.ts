import { describe, expect, it } from "vitest";

import {
  DEFAULT_FRAMEWORK,
  DEFAULT_TAB,
  DEFAULT_VIEWPORT,
  buildWorkbenchQuery,
  parseWorkbenchParams,
} from "./workbench-params";

function sp(query: string): URLSearchParams {
  return new URLSearchParams(query);
}

describe("parseWorkbenchParams", () => {
  it("returns defaults for empty params", () => {
    expect(parseWorkbenchParams(sp(""))).toEqual({
      framework: DEFAULT_FRAMEWORK,
      tab: DEFAULT_TAB,
      viewport: DEFAULT_VIEWPORT,
    });
  });

  it("parses valid values case-sensitively", () => {
    const result = parseWorkbenchParams(sp("fw=mantine&tab=props&vp=tablet"));
    expect(result).toEqual({
      framework: "mantine",
      tab: "props",
      viewport: "tablet",
    });
  });

  it("falls back per-key on invalid values", () => {
    const result = parseWorkbenchParams(
      sp("fw=jquery&tab=everything&vp=hologram"),
    );
    expect(result).toEqual({
      framework: DEFAULT_FRAMEWORK,
      tab: DEFAULT_TAB,
      viewport: DEFAULT_VIEWPORT,
    });
  });

  it("falls back per-key when a key is missing", () => {
    const result = parseWorkbenchParams(sp("fw=antd"));
    expect(result.framework).toBe("antd");
    expect(result.tab).toBe(DEFAULT_TAB);
    expect(result.viewport).toBe(DEFAULT_VIEWPORT);
  });
});

describe("buildWorkbenchQuery", () => {
  it("returns empty string when everything equals defaults", () => {
    expect(
      buildWorkbenchQuery({
        framework: "bootstrap",
        tab: "code",
        viewport: "desktop",
      }),
    ).toBe("");
  });

  it("encodes only non-default values", () => {
    expect(
      buildWorkbenchQuery({
        framework: "mantine",
        tab: "code",
        viewport: "desktop",
      }),
    ).toBe("fw=mantine");
    expect(
      buildWorkbenchQuery({
        framework: "bootstrap",
        tab: "docs",
        viewport: "mobile",
      }),
    ).toBe("tab=docs&vp=mobile");
  });

  it("joins multiple non-defaults in fw,tab,vp order", () => {
    expect(
      buildWorkbenchQuery({
        framework: "antd",
        tab: "props",
        viewport: "tablet",
      }),
    ).toBe("fw=antd&tab=props&vp=tablet");
  });
});
