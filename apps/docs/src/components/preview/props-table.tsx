"use client";

import type { PropDefinition } from "@/data/props-data";

interface PropsTableProps {
  props: PropDefinition[];
}

export function PropsTable({ props }: Readonly<PropsTableProps>) {
  return (
    <div className="border-border bg-background supports-[backdrop-filter]:bg-background/60 overflow-hidden rounded-2xl border shadow-sm supports-[backdrop-filter]:backdrop-blur-xl">
      <div className="border-border bg-muted/50 border-b px-5 py-3">
        <h3 className="text-sm font-semibold">Props</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="divide-border min-w-full divide-y">
          <thead className="bg-muted/40">
            <tr>
              <th className="text-muted-foreground px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">
                Prop
              </th>
              <th className="text-muted-foreground px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">
                Type
              </th>
              <th className="text-muted-foreground px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">
                Default
              </th>
              <th className="text-muted-foreground px-5 py-2.5 text-left text-xs font-medium uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {props.map((prop) => (
              <tr
                key={prop.name}
                className="hover:bg-muted/40 transition-colors"
              >
                <td className="whitespace-nowrap px-5 py-2.5 text-sm">
                  <code className="bg-muted text-foreground/80 rounded px-1.5 py-0.5 font-mono text-xs font-medium">
                    {prop.name}
                  </code>
                </td>
                <td className="whitespace-nowrap px-5 py-2.5 text-sm">
                  <span className="bg-primary/10 text-primary rounded-md px-2 py-0.5 text-xs font-medium">
                    {prop.type}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-2.5 text-sm">
                  {prop.default ? (
                    <span className="text-foreground text-xs font-medium">
                      {prop.default}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">
                      required
                    </span>
                  )}
                </td>
                <td className="text-muted-foreground px-5 py-2.5 text-sm">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
