import { describe, expect, it } from "vitest";

import { antdRegistry } from "./registry/antd";
import { bootstrapRegistry } from "./registry/bootstrap";
import { shadcnRegistry } from "./registry/shadcn";

describe("registry framework parity", () => {
  const bootstrapKeys = Object.keys(bootstrapRegistry);
  const antdKeys = Object.keys(antdRegistry);
  const shadcnKeys = Object.keys(shadcnRegistry);

  it("registers every pattern in all three frameworks", () => {
    expect(bootstrapKeys).toHaveLength(54);
    expect(antdKeys).toHaveLength(54);
    expect(shadcnKeys).toHaveLength(54);
    expect(new Set(antdKeys)).toEqual(new Set(bootstrapKeys));
    expect(new Set(shadcnKeys)).toEqual(new Set(bootstrapKeys));
  });

  it("keeps consistent entry order across frameworks", () => {
    expect(antdKeys).toEqual(bootstrapKeys);
    expect(shadcnKeys).toEqual(bootstrapKeys);
  });
});
