import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-gray-900 rounded-lg shadow-md border border-gray-800 p-6 ${className}`}>
      {children}
    </div>
  );
};
