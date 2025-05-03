import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import { SportEvents } from './SportEvents';
import { SportEvent } from '@/types';

jest.mock('@/components/BettingPopup', () => ({
  BettingPopup: ({ isOpen, onClose, onPlaceBet, isPlacingBet }: any) => (
    isOpen ? (
      <div data-testid="betting-popup">
        <button data-testid="close-popup" onClick={onClose}>Close</button>
        <button 
          data-testid="place-bet-button" 
          onClick={() => onPlaceBet(100)}
          disabled={isPlacingBet}
        >
          Place Bet
        </button>
      </div>
    ) : null
  ),
}));

jest.mock('@/lib/notification', () => ({
  notifyError: jest.fn(),
}));

describe('SportEvents Component', () => {
  const mockEvents: SportEvent[] = [
    {
      eventId: '1',
      eventName: 'Test Event 1',
      odds: 2.5,
    },
    {
      eventId: '2',
      eventName: 'Test Event 2',
      odds: 1.8,
    },
  ];

  const mockOnPlaceBet = jest.fn().mockImplementation((_eventId: string, _amount: number): Promise<void> => Promise.resolve());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state when no events are available', () => {
    render(<SportEvents events={[]} onPlaceBet={mockOnPlaceBet} isPlacingBet={false} />);
    expect(screen.getByText('No events available at the moment.')).toBeInTheDocument();
  });

  it('renders list of events', () => {
    render(<SportEvents events={mockEvents} onPlaceBet={mockOnPlaceBet} isPlacingBet={false} />);
    
    expect(screen.getByText('Test Event 1')).toBeInTheDocument();
    expect(screen.getByText('Test Event 2')).toBeInTheDocument();
    expect(screen.getByText('Odds: 2.5')).toBeInTheDocument();
    expect(screen.getByText('Odds: 1.8')).toBeInTheDocument();
  });

  it('displays event information correctly', () => {
    render(<SportEvents events={mockEvents} onPlaceBet={mockOnPlaceBet} isPlacingBet={false} />);
    
    expect(screen.getByText('Test Event 1')).toBeInTheDocument();
    expect(screen.getByText('Test Event 2')).toBeInTheDocument();
    expect(screen.getByText('Odds: 2.5')).toBeInTheDocument();
    expect(screen.getByText('Odds: 1.8')).toBeInTheDocument();
  });

  it('opens betting popup when bet button is clicked', () => {
    render(<SportEvents events={mockEvents} onPlaceBet={mockOnPlaceBet} isPlacingBet={false} />);
    
    const betButtons = screen.getAllByText('Place Bet');
    fireEvent.click(betButtons[0]);
    
    expect(screen.getByTestId('betting-popup')).toBeInTheDocument();
  });

  it('closes betting popup when close button is clicked', () => {
    render(<SportEvents events={mockEvents} onPlaceBet={mockOnPlaceBet} isPlacingBet={false} />);
    
    const betButtons = screen.getAllByText('Place Bet');
    fireEvent.click(betButtons[0]);
    expect(screen.getByTestId('betting-popup')).toBeInTheDocument();
    
    const closeButton = screen.getByTestId('close-popup');
    fireEvent.click(closeButton);
    expect(screen.queryByTestId('betting-popup')).not.toBeInTheDocument();
  });

  it('disables bet buttons when isPlacingBet is true', () => {
    render(<SportEvents events={mockEvents} onPlaceBet={mockOnPlaceBet} isPlacingBet={true} />);
    
    const betButtons = screen.getAllByText('Placing Bet...');
    betButtons.forEach(button => {
      expect(button).toBeDisabled();
    });
  });

  it('handles successful bet placement', async () => {
    mockOnPlaceBet.mockResolvedValueOnce(undefined);
    
    render(<SportEvents events={mockEvents} onPlaceBet={mockOnPlaceBet} isPlacingBet={false} />);
    
    const betButtons = screen.getAllByText('Place Bet');
    fireEvent.click(betButtons[0]);
    const placeBetButton = screen.getByTestId('place-bet-button');
    fireEvent.click(placeBetButton);
    
    await waitFor(() => {
      expect(mockOnPlaceBet).toHaveBeenCalledWith('1', 100);
    });
  });

  it('handles failed bet placement', async () => {
    const { notifyError } = require('@/lib/notification');
    mockOnPlaceBet.mockRejectedValueOnce(new Error('Failed to place bet'));
    
    render(<SportEvents events={mockEvents} onPlaceBet={mockOnPlaceBet} isPlacingBet={false} />);
    
    const betButtons = screen.getAllByText('Place Bet');
    fireEvent.click(betButtons[0]);
    const placeBetButton = screen.getByTestId('place-bet-button');
    fireEvent.click(placeBetButton);
    
    await waitFor(() => {
      expect(notifyError).toHaveBeenCalledWith('Failed to place bet. Please try again.');
    });
  });
}); 