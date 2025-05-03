import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useBetting } from './useBetting';
import React from 'react';

describe('useBetting Hook', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useBetting(), { wrapper });

    expect(result.current.betError).toBeNull();
    expect(result.current.isPlacingBet).toBe(false);
    expect(typeof result.current.placeBet).toBe('function');
    expect(typeof result.current.clearBetError).toBe('function');
  });

  it('should place bet successfully', async () => {
    const { result } = renderHook(() => useBetting(), { wrapper });

    await act(async () => {
      result.current.placeBet({ eventId: '123', amount: 100 });
    });

    expect(result.current.betError).toBeNull();
    expect(result.current.isPlacingBet).toBe(false);
  });

  it('should handle bet error', async () => {
    const errorMessage = 'Failed to place bet';
    const mockError = new Error(errorMessage);
    
    jest.spyOn(queryClient, 'invalidateQueries').mockImplementationOnce(() => {
      throw mockError;
    });

    const { result } = renderHook(() => useBetting(), { wrapper });

    await act(async () => {
      result.current.placeBet({ eventId: '123', amount: 100 });
    });

    expect(result.current.betError).toBe(errorMessage);
  });

  it('should clear bet error', () => {
    const { result } = renderHook(() => useBetting(), { wrapper });

    act(() => {
      result.current.clearBetError();
    });

    expect(result.current.betError).toBeNull();
  });

  it('should invalidate queries on successful bet', async () => {
    const invalidateQueriesSpy = jest.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useBetting(), { wrapper });

    await act(async () => {
      result.current.placeBet({ eventId: '123', amount: 100 });
    });

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: ['events'] });
  });
}); 