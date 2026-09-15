import { describe, expect, it } from "vitest";

import { antdRegistry } from "./registry/antd";
import { mantineRegistry } from "./registry/mantine";
import { shadcnRegistry } from "./registry/shadcn";

describe("registry framework parity", () => {
  const mantineKeys = Object.keys(mantineRegistry);
  const antdKeys = Object.keys(antdRegistry);
  const shadcnKeys = Object.keys(shadcnRegistry);

  it("registers every pattern in all three frameworks", () => {
    expect(mantineKeys).toHaveLength(54);
    expect(antdKeys).toHaveLength(54);
    expect(shadcnKeys).toHaveLength(54);
    expect(new Set(antdKeys)).toEqual(new Set(mantineKeys));
    expect(new Set(shadcnKeys)).toEqual(new Set(mantineKeys));
  });

  it("keeps consistent entry order across frameworks", () => {
    expect(antdKeys).toEqual(mantineKeys);
    expect(shadcnKeys).toEqual(mantineKeys);
  });
});
