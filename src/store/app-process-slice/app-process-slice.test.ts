import {SortingOption, cities} from '../../consts';
import {appProcessSlice} from './app-process-slice';
import {changeCity, changeSortingOption} from './app-process-slice';

describe('AppProcess Slice', () => {
  const initialState = {
    currentCity: cities[0],
    currentSortingOption: SortingOption.Default,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {currentCity: cities[1], currentSortingOption: SortingOption.Default};
    const result = appProcessSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = initialState;
    const result = appProcessSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should change current city with "changeCity" action', () => {
    const newCity = cities[3];
    const state = initialState;
    const expectedState = { currentCity: cities[3], currentSortingOption: SortingOption.Default };
    const result = appProcessSlice.reducer(state, changeCity(newCity));
    expect(result).toEqual(expectedState);
  });

  it('should change current sorting option from "Popular" to "Top rated first" with "changeSortingOption" action', () => {
    const newSortingOption = SortingOption.TopRatedFirst;
    const state = initialState;
    const expectedState = { currentCity: cities[0], currentSortingOption: SortingOption.TopRatedFirst };
    const result = appProcessSlice.reducer(state, changeSortingOption(newSortingOption));
    expect(result).toEqual(expectedState);
  });
});
