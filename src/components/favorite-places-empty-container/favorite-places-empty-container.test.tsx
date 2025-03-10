import {render, screen} from '@testing-library/react';
import FavoritePlacesEmptyContainer from './favorite-places-empty-container';

describe('Component: Favorite places empty container', () => {
  it('should render correct', () => {
    const expectedText = /Save properties to narrow down search or plan your future trips./i;
    render(<FavoritePlacesEmptyContainer />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
