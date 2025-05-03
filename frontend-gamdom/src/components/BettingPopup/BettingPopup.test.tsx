import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '../../test-utils';
import { BettingPopup, BettingPopupProps } from './BettingPopup';
import { SportEvent } from '../../types';

describe('BettingPopup Component', () => {
  const mockOnClose = jest.fn();
  const mockOnPlaceBet = jest.fn();
  const mockSelectedEvent: SportEvent = {
    eventId: '1',
    eventName: 'Test Event',
    odds: 2.5,
  };

  const defaultProps: BettingPopupProps = {
    isOpen: true,
    isPlacingBet: false,
    onClose: mockOnClose,
    onPlaceBet: mockOnPlaceBet as unknown as (amount: number) => Promise<void>,
    selectedEvent: mockSelectedEvent
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<BettingPopup {...defaultProps} />);
    expect(screen.getByText('Place Your Bet')).toBeInTheDocument();
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Odds: 2.5')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<BettingPopup {...defaultProps} isOpen={false} />);
    expect(screen.queryByText('Place Your Bet')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<BettingPopup {...defaultProps} />);
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onPlaceBet with correct amount when form is submitted', async () => {
    render(<BettingPopup {...defaultProps} />);
    const input = screen.getByLabelText('Bet Amount');
    const submitButton = screen.getByRole('button', { name: 'Place Bet' });

    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.click(submitButton);

    expect(mockOnPlaceBet).toHaveBeenCalledWith(100);
  });

  it('shows loading state when isPlacingBet is true', () => {
    render(<BettingPopup {...defaultProps} isPlacingBet={true} />);
    expect(screen.getByRole('button', { name: 'Placing Bet...' })).toBeDisabled();
  });
}); 