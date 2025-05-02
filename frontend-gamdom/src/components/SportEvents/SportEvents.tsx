import { useState } from 'react';
import * as S from './SportEvents.styles';
import { BettingPopup } from '@/components/BettingPopup';
import { notifyError } from '@/lib/notification';
import { SportEvent } from '@/types';

interface SportEventsProps {
  events: SportEvent[];
  onPlaceBet: (eventId: string, amount: number) => Promise<void>;
  isPlacingBet: boolean;
}

export const SportEvents = ({ events, onPlaceBet, isPlacingBet }: SportEventsProps) => {
  const [selectedEvent, setSelectedEvent] = useState<SportEvent | null>(null);

  const handleBet = async (amount: number) => {
    if (!selectedEvent) return;
    try {
      await onPlaceBet(selectedEvent.eventId, amount);
    } catch (error) {
      notifyError('Failed to place bet. Please try again.');
    }
  };

  if (events.length === 0) {
    return <S.EmptyContainer>No events available at the moment.</S.EmptyContainer>;
  }

  return (
    <S.Container>
      <S.EventList>
        {events.map((event) => (
          <S.EventCard key={event.eventId}>
            <S.EventInfo>
              <S.EventName>{event.eventName}</S.EventName>
              <S.Odds>Odds: {event.odds}</S.Odds>
            </S.EventInfo>
            <S.BetButton 
              onClick={() => setSelectedEvent(event)}
              disabled={isPlacingBet}
            >
              {isPlacingBet ? 'Placing Bet...' : 'Place Bet'}
            </S.BetButton>
          </S.EventCard>
        ))}
      </S.EventList>

      {selectedEvent && (
        <BettingPopup
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onPlaceBet={handleBet}
          selectedEvent={selectedEvent}
          isPlacingBet={isPlacingBet}
        />
      )}
    </S.Container>
  );
};
