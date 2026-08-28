import { describe, expect, it } from "vitest";

import { antdRegistry } from "./registry/antd";
import { bootstrapRegistry } from "./registry/bootstrap";
import { mantineRegistry } from "./registry/mantine";

describe("registry framework parity", () => {
  const bootstrapKeys = Object.keys(bootstrapRegistry);
  const antdKeys = Object.keys(antdRegistry);
  const mantineKeys = Object.keys(mantineRegistry);

  it("registers every pattern in all three frameworks", () => {
    expect(bootstrapKeys).toHaveLength(54);
    expect(antdKeys).toHaveLength(54);
    expect(mantineKeys).toHaveLength(54);
    expect(new Set(antdKeys)).toEqual(new Set(bootstrapKeys));
    expect(new Set(mantineKeys)).toEqual(new Set(bootstrapKeys));
  });

  it("keeps consistent entry order across frameworks", () => {
    expect(antdKeys).toEqual(bootstrapKeys);
    expect(mantineKeys).toEqual(bootstrapKeys);
  });
});
