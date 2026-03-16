import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`ml-64 mt-16 min-h-screen bg-gray-50 ${className}`}>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
