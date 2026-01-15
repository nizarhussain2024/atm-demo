import React from 'react';
import { ATMSideButton } from './ATMSideButton';

interface ButtonConfig {
  label?: string;
  onClick?: () => void;
}

interface ATMScreenWithButtonsProps {
  children: React.ReactNode;
  leftButtons?: [ButtonConfig?, ButtonConfig?, ButtonConfig?, ButtonConfig?];
  rightButtons?: [ButtonConfig?, ButtonConfig?, ButtonConfig?, ButtonConfig?];
  screenType?: 'transaction-complete' | 'default';
}

export const ATMScreenWithButtons: React.FC<ATMScreenWithButtonsProps> = ({
  children,
  leftButtons = [{}, {}, {}, {}],
  rightButtons = [{}, {}, {}, {}],
  screenType = 'default',
}) => {
  // Fill in empty slots
  const left = [...leftButtons, {}, {}, {}, {}].slice(0, 4) as ButtonConfig[];
  const right = [...rightButtons, {}, {}, {}, {}].slice(0, 4) as ButtonConfig[];

  return (
    <div className="flex items-start justify-center">
      {/* Left physical buttons with connectors */}
      <div className="side-buttons">
        {left.map((btn, i) => (
          <ATMSideButton key={`left-${i}`} onClick={btn?.onClick} side="left" />
        ))}
      </div>

      {/* Screen with grey frame */}
      <div className="atm-screen-frame">
        <div className="atm-screen w-[240px] h-[200px] relative text-atm-screen-text">
          {/* Left labels - inside screen aligned with buttons */}
          <div className="absolute left-0 top-[18px] flex flex-col gap-[14px]">
            {left.map((btn, i) => (
              <div key={`left-label-${i}`} className="h-5 flex items-center">
                {btn?.label && (
                  <span 
                    className="text-[12px] whitespace-nowrap tracking-wide text-white font-bold"
                    style={{ paddingTop: btn.label === 'Withdraw' ? '98px' : btn.label === 'Deposit' ? '88px' : undefined, fontFamily: 'Amiga, monospace' }}
                  >
                    — {btn.label}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Right labels - inside screen aligned with buttons */}
          <div className="absolute right-0 top-[18px] flex flex-col gap-[14px]">
            {right.map((btn, i) => (
              <div key={`right-label-${i}`} className="h-5 flex items-center justify-end">
                {btn?.label && !btn?.label.includes('Enter PIN') && !btn?.label.includes('Re-Enter') && !btn?.label.includes('Cancel') && (
                  <span 
                    className="text-[12px] whitespace-nowrap tracking-wide text-white font-bold"
                    style={{ 
                      paddingTop: btn.label === 'Exit' 
                        ? (screenType === 'transaction-complete' ? '109px' : '110px') 
                        : btn.label === 'Balance' ? '98px' 
                        : btn.label === 'Back' ? '109px' 
                        : btn.label === 'Continue' ? '97px' 
                        : undefined, 
                      fontFamily: 'Amiga, monospace' 
                    }}
                  >
                    {btn.label} —
                  </span>
                )}
                {btn?.label === 'Cancel' && (
                  <span 
                    className="text-[12px] whitespace-nowrap tracking-wide text-white"
                    style={{ paddingTop: '116px', fontFamily: 'Amiga, monospace', fontWeight: 'bold' }}
                  >
                    Cancel —
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Enter PIN - positioned bottom-right */}
          {right.some(btn => btn?.label?.includes('Enter PIN')) && (
            <span className="enter-pin">
              Enter PIN —
            </span>
          )}

          {/* Re-Enter PIN - positioned bottom-right */}
          {right.some(btn => btn?.label?.includes('Re-Enter')) && (
            <span className="enter-pin">
              Re-Enter PIN —
            </span>
          )}

          {/* Screen content - centered */}
          <div>
            {children}
          </div>
        </div>
      </div>

      {/* Right physical buttons with connectors */}
      <div className="side-buttons">
        {right.map((btn, i) => (
          <ATMSideButton key={`right-${i}`} onClick={btn?.onClick} side="right" />
        ))}
      </div>
    </div>
  );
};
