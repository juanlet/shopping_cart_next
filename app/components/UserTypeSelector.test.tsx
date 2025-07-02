import { render, screen, fireEvent } from '@testing-library/react';
import { UserTypeSelector } from './UserTypeSelector';

describe('<UserTypeSelector />', () => {
  it('should call setUserType with the correct value when changed', () => {
    // jest.fn() creates a mock function we can track.
    const mockSetUserType = jest.fn();

    render(
      <UserTypeSelector userType="common" setUserType={mockSetUserType} />
    );

    // Find the button for the "VIP" option.
    const vipButton = screen.getByRole('button', { name: /VIP/i });

    // Simulate a user clicking the button.
    fireEvent.click(vipButton);

    // Assert that our mock function was called with the expected value.
    expect(mockSetUserType).toHaveBeenCalledWith('vip');
  });
});