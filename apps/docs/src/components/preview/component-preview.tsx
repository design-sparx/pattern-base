'use client';

import { useState } from 'react';
import { componentRegistry } from '@/lib/registry';
import { codeSnippets } from '@/data/code-snippets';
import { CodeBlock } from './code-block';
import { FrameworkTabs } from './framework-tabs';

interface ComponentPreviewProps {
  patternId: string;
}

export function ComponentPreview({ patternId }: ComponentPreviewProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const entry = componentRegistry[patternId];
  const snippets = codeSnippets[patternId];

  if (!entry || !snippets) {
    return <div className="text-gray-500">Component not found: {patternId}</div>;
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            tab === 'preview' ? 'bg-white border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => setTab('preview')}
        >
          Preview
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            tab === 'code' ? 'bg-white border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
          }`}
          onClick={() => setTab('code')}
        >
          Code
        </button>
      </div>

      <FrameworkTabs>
        {(framework) => (
          <div className="p-6">
            {tab === 'preview' ? (
              <div className="min-h-[200px]">
                {framework === 'bootstrap' ? (
                  <entry.bootstrap />
                ) : (
                  <entry.antd />
                )}
              </div>
            ) : (
              <CodeBlock code={snippets[framework]} />
            )}
          </div>
        )}
      </FrameworkTabs>
    </div>
  );
}
