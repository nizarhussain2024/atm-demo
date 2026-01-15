import React from 'react';
import creditCardLogos from '@/assets/creditcard_logos.png';
import { CardType } from '@/hooks/useATM';

interface CreditCardLogosProps {
  activeCardType?: CardType | null;
}

// All card types in order as they appear in the sprite
const allCards: CardType[] = ['star', 'pulse', 'mastercard', 'cirrus', 'plus', 'visa'];

// Clip path to show only one card at a specific position (0-5)
const getCardClipPath = (index: number): string => {
  const left = (index * 16.66);
  const right = 100 - ((index + 1) * 16.66);
  return `inset(0 ${right.toFixed(2)}% 0 ${left.toFixed(2)}%)`;
};

export const CreditCardLogos: React.FC<CreditCardLogosProps> = ({ activeCardType }) => {
  return (
    <div className="credit-card-logos-container">
      {/* Render each card individually with correct opacity */}
      {allCards.map((cardType, index) => {
        const isActive = activeCardType === cardType;
        return (
          <img 
            key={cardType}
            src={creditCardLogos} 
            alt={`${cardType} logo`}
            className="credit-card-logo-single"
            style={{
              clipPath: getCardClipPath(index),
              opacity: isActive ? 1 : 0.25,
            }}
          />
        );
      })}
    </div>
  );
};
