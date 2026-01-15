import React from 'react';

interface ATMKeypadProps {
  onDigitPress: (digit: string) => void;
  onClear: () => void;
  onEnter: () => void;
  onDelete?: () => void;
}

export const ATMKeypad: React.FC<ATMKeypadProps> = ({ 
  onDigitPress, 
  onClear, 
  onEnter,
  onDelete 
}) => {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className="grid grid-cols-4 gap-2" style={{ padding: '5rem' }}>
      {/* Number pad */}
      <div className="col-span-3 grid grid-cols-3 gap-2">
        {digits.slice(0, 9).map((digit) => (
          <button
            key={digit}
            onClick={() => onDigitPress(digit)}
            className="keypad-button w-12 h-10 rounded font-mono text-lg text-card-foreground"
          >
            {digit}
          </button>
        ))}
        <div /> {/* Empty space */}
        <button
          onClick={() => onDigitPress('0')}
          className="keypad-button w-12 h-10 rounded font-mono text-lg text-card-foreground"
        >
          0
        </button>
        <button
          onClick={() => onDigitPress('00')}
          className="keypad-button w-12 h-10 rounded font-mono text-sm text-card-foreground"
        >
          00
        </button>
      </div>

      {/* Function buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onClear}
          className="keypad-button w-12 h-10 rounded font-mono text-xs text-destructive font-bold"
        >
          CLR
        </button>
        {onDelete && (
          <button
            onClick={onDelete}
            className="keypad-button w-12 h-10 rounded font-mono text-xs text-card-foreground font-bold"
          >
            DEL
          </button>
        )}
        <button
          onClick={onEnter}
          className="keypad-button w-12 h-[calc(40px*2+8px)] rounded font-mono text-xs text-primary font-bold"
          style={{ marginTop: onDelete ? 0 : 'auto' }}
        >
          ENTER
        </button>
      </div>
    </div>
  );
};
