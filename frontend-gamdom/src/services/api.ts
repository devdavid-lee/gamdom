import { SportEvent } from "@/types";

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchEvents = async (): Promise<SportEvent[]> => {
  
  try {
    const response = await fetch(`${apiUrl}/events`, {
      signal: AbortSignal.timeout(5000),
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data ?? [];
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
};