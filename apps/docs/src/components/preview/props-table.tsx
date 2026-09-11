"use client";

import type { PropDefinition } from "@/data/props-data";

interface PropsTableProps {
  props: PropDefinition[];
}

export function PropsTable({ props }: Readonly<PropsTableProps>) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Props
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Prop
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Default
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {props.map((prop) => (
              <tr
                key={prop.name}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    {prop.name}
                  </code>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  <span className="inline-flex items-center rounded-md bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
                    {prop.type}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-sm">
                  {prop.default ? (
                    <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                      {prop.default}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">
                      required
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
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
