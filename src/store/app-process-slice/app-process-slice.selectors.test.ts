import {NameSpace, cities, SortingOption} from '../../consts';
import {getCurrentCity, getCurrentSortingOption} from './selectors';

describe('AppProcess selectors', () => {
  const state = {
    [NameSpace.App]: {
      currentCity: cities[0],
      currentSortingOption: SortingOption.Default,
    }
  };

  it('should return current city from state', () => {
    const { currentCity } = state[NameSpace.App];
    const result = getCurrentCity(state);
    expect(result).toBe(currentCity);
  });

  it('should return current sorting option from state', () => {
    const { currentSortingOption } = state[NameSpace.App];
    const result = getCurrentSortingOption(state);
    expect(result).toBe(currentSortingOption);
  });
});
