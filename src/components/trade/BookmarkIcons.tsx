import React from 'react';

export function BookmarkOutlineIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M19 19.9948V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19.9948C5 20.8047 5.91243 21.2787 6.57503 20.813L10.8499 17.8083C11.54 17.3233 12.46 17.3233 13.1501 17.8083L17.425 20.813C18.0876 21.2787 19 20.8047 19 19.9948Z" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BookmarkFilledIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M7 2C5.34314 2 4 3.34315 4 5V19.9948C4 21.6146 5.82485 22.5625 7.15006 21.6311L11.425 18.6265C11.77 18.384 12.23 18.384 12.575 18.6265L16.8499 21.6311C18.1751 22.5625 20 21.6146 20 19.9948V5C20 3.34315 18.6569 2 17 2H7Z" 
        fill="currentColor"
      />
    </svg>
  );
}
