import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-10 h-10">
        {/* Blue shape */}
        <div 
          className="absolute top-0 left-0 w-6 h-6 bg-blue-600" 
          style={{ borderRadius: '12px 0 12px 0' }}
        />
        {/* Coral shape */}
        <div 
          className="absolute bottom-0 right-0 w-8 h-8 bg-[#F28C82]" 
          style={{ borderRadius: '16px 0 16px 0' }}
        />
      </div>
      <span className="text-2xl font-bold text-blue-600 tracking-tight">sada</span>
    </div>
  );
}
