import { useEffect, useCallback } from 'react';
import { useSportEvents } from '@/hooks/useSportEvents';
import { useBetting } from '@/hooks/useBetting';
import { Container } from './BettingEventsPage.styles';
import { SportEvents } from '@/components/SportEvents/SportEvents';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import { notifySuccess, notifyError } from '@/lib/notification';

export const BettingEventsPage = () => {
  const { events, isLoading } = useSportEvents();
  const { placeBet, isPlacingBet, betError, clearBetError } = useBetting();

  const handlePlaceBet = useCallback(async (eventId: string, amount: number) => {
    placeBet({ eventId, amount });
    notifySuccess('Bet placed successfully!');
  }, [placeBet]);

  useEffect(() => {
    if (betError) {
      notifyError(betError);
      clearBetError();
    }
  }, [betError, clearBetError]);

  return (
    <>
      {
        isLoading ? <LoadingSpinner /> :
          <Container>
            <SportEvents 
              events={events} 
              onPlaceBet={handlePlaceBet}
              isPlacingBet={isPlacingBet}
            />
          </Container>
      }
    </>
  );
};