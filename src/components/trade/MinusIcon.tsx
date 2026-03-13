import React from 'react';

export function MinusIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 12 12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M2 6H10" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
