import React from 'react';

interface ATMSideButtonProps {
  onClick?: () => void;
  side: 'left' | 'right';
}

export const ATMSideButton: React.FC<ATMSideButtonProps> = ({ onClick, side }) => {
  return (
    <div className={`flex items-center ${side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
      {/* Button */}
      <button
        onClick={onClick}
        className="w-[50px] h-[20px] bg-[hsl(0,0%,78%)] rounded-[3px] cursor-pointer disabled:cursor-not-allowed shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] border border-[hsl(0,0%,70%)]"
        disabled={!onClick}
      />
      {/* Connector line */}
      <div className="w-[8px] h-[3px] bg-[hsl(0,0%,78%)]" />
    </div>
  );
};
