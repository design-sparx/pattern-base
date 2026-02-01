'use client';

import { useState } from 'react';

interface FrameworkTabsProps {
  children: (framework: 'bootstrap' | 'antd') => React.ReactNode;
}

export function FrameworkTabs({ children }: FrameworkTabsProps) {
  const [framework, setFramework] = useState<'bootstrap' | 'antd'>('bootstrap');

  return (
    <div>
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            framework === 'bootstrap'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setFramework('bootstrap')}
        >
          Bootstrap
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            framework === 'antd'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setFramework('antd')}
        >
          Ant Design
        </button>
      </div>
      {children(framework)}
    </div>
  );
}
