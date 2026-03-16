import React, { ReactNode } from 'react';

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
}

export const MobileContainer = ({ children, className = '' }: MobileContainerProps) => {
  return (
    <div className={`max-w-md mx-auto min-h-screen bg-white relative ${className}`}>
      {children}
    </div>
  );
};