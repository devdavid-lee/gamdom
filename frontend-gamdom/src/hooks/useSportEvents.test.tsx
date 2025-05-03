import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSportEvents } from './useSportEvents';
import { fetchEvents } from '@/services/api';
import React from 'react';
import { SportEvent } from '@/types';

jest.mock('@/services/api', () => ({
  fetchEvents: jest.fn().mockImplementation(() => Promise.resolve([]))
}));

describe('useSportEvents Hook', () => {
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

  const wrapper = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };

  it('should return empty events array when data is not loaded', () => {
    const { result } = renderHook(() => useSportEvents(), { wrapper });

    expect(result.current.events).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it('should return events when data is loaded successfully', async () => {
    const mockEvents: SportEvent[] = [{ eventId: '1', eventName: 'Event 1', odds: 1.0 }, { eventId: '2', eventName: 'Event 2', odds: 1.0 }];
    (fetchEvents as any).mockResolvedValueOnce(mockEvents);

    const { result } = renderHook(() => useSportEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.events).toEqual(mockEvents);
  });

  it('should handle null data gracefully', async () => {
    (fetchEvents as any).mockResolvedValueOnce(null);

    const { result } = renderHook(() => useSportEvents(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.events).toEqual([]);
  });
}); 