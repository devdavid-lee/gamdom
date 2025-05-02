import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface BettingError {
  message: string;
}

export const useBetting = () => {
  const [betError, setBetError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate: placeBet, isPending: isPlacingBet } = useMutation({
    mutationFn: async ({ eventId, amount }: { eventId: string; amount: number }) => {
      const response = { data: { eventId, amount } };
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      setBetError(null);
    },
    onError: (error: BettingError) => {
      setBetError(error.message);
    },
  });

  const clearBetError = () => setBetError(null);

  return {
    placeBet,
    isPlacingBet,
    betError,
    clearBetError,
  };
}; 