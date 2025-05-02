import { useState } from 'react';
import * as S from './BettingPopup.styles';
import { SportEvent } from '@/types';

export interface BettingPopupProps {
  isOpen: boolean;
  isPlacingBet: boolean;
  onClose: () => void;
  onPlaceBet: (amount: number) => Promise<void>;
  selectedEvent: SportEvent;
}

export const BettingPopup = ({
  isOpen,
  isPlacingBet,
  onClose,
  onPlaceBet,
  selectedEvent,
}: BettingPopupProps) => {
  const [amount, setAmount] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const betAmount = parseFloat(amount);
    if (betAmount > 0) {
      await onPlaceBet(betAmount);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose} data-testid="overlay">
      <S.Popup onClick={(e: React.MouseEvent) => e.stopPropagation()} data-testid="popup">
        <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        <S.Title>Place Your Bet</S.Title>
        <S.EventInfo>
          <S.EventName>{selectedEvent.eventName}</S.EventName>
          <S.Odds>Odds: {selectedEvent.odds}</S.Odds>
        </S.EventInfo>
        <S.Form onSubmit={handleSubmit}>
          <S.InputGroup>
            <S.Label htmlFor="amount">Bet Amount</S.Label>
            <S.Input
              type="number"
              id="amount"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
              min="0"
              step="0.01"
              required
              placeholder="Enter amount"
            />
          </S.InputGroup>
          <S.PotentialWin>
            Potential Win: ${amount ? (parseFloat(amount) * selectedEvent.odds).toFixed(2) : '0.00'}
          </S.PotentialWin>
          <S.SubmitButton
            type="submit" 
            disabled={isPlacingBet || !amount}
          >
            {isPlacingBet ? 'Placing Bet...' : 'Place Bet'}
          </S.SubmitButton>
        </S.Form>
      </S.Popup>
    </S.Overlay>
  );
}; 