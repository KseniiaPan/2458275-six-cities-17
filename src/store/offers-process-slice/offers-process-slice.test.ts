import {offersProcessSlice} from './offers-process-slice';
import {fetchOffersAction} from '../api-actions';
import {mockOffers} from '../../utils/mocks';

describe('offersProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      offers: mockOffers,
      isOffersDataLoading: false,
    };
    const result = offersProcessSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      offers: [],
      isOffersDataLoading: false,
    };
    const result = offersProcessSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersDataLoading" to "true" with "fetchOffersAction.pending"', () => {
    const expectedState = {
      offers: [],
      isOffersDataLoading: true,
    };
    const result = offersProcessSlice.reducer(undefined, fetchOffersAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersDataLoading" to "false", "offers" to an array with offers with "fetchOffersAction.fulfilled"', () => {
    const expectedState = {
      offers: mockOffers,
      isOffersDataLoading: false,
    };
    const result = offersProcessSlice.reducer(undefined, fetchOffersAction.fulfilled(mockOffers, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersDataLoading" to "false" with "fetchOffersAction.rejected"', () => {
    const expectedState = {
      offers: [],
      isOffersDataLoading: false,
    };
    const result = offersProcessSlice.reducer(undefined, fetchOffersAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
