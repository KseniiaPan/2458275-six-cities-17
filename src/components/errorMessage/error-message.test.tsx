import {render, screen} from '@testing-library/react';
import ErrorMessage from './error-message';

describe('Component: Error message', () => {
  it('should render correct', () => {
    const expectedText = /There was an error while loading data, please try again/i;
    render(<ErrorMessage />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
