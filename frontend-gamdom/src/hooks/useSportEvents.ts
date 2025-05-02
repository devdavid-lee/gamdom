import { fetchEvents } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export const useSportEvents = () => {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['sportEvents'],
    queryFn: fetchEvents,
  });

  console.log('error', error);

  if (error) {
    throw new Error('Network connection error! please try again later.');
  }

  return {
    events: events ?? [],
    isLoading,
    error
  };
}; 