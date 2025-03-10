import {fullOfferProcessSlice} from './full-offer-process-slice';
import {fetchOfferDataAction, fetchNearbyPlacesAction} from '../api-actions';
import {makeFakeFullOffer, mockOffers} from '../../utils/mocks';

const initialState = {
  fullOfferData: null,
  nearbyPlaces: [],
  isFullOfferDataLoading: true,
  isFullOfferLoadingError: false,
  isNearbyPlacesDataLoading: true,
};
const mockFullOffer = makeFakeFullOffer();
describe('FullOfferProcess Slice', () => {

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {...initialState, fullOfferData: mockFullOffer};
    const result = fullOfferProcessSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {...initialState};
    const result = fullOfferProcessSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isFullOfferDataLoading" to "true" with "fetchOfferDataAction.pending"', () => {
    const expectedState = {...initialState, isFullOfferDataLoading: true};
    const result = fullOfferProcessSlice.reducer(undefined, fetchOfferDataAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "isFullOfferDataLoading" to "false", "isFullOfferLoadingError" to "false",  "fullOfferData" to an object with full offer information with "fetchOfferDataAction.fulfilled"', () => {
    const expectedState = {...initialState, fullOfferData: mockFullOffer, isFullOfferDataLoading: false};
    const result = fullOfferProcessSlice.reducer(undefined, fetchOfferDataAction.fulfilled(mockFullOffer, '', mockFullOffer.id));
    expect(result).toEqual(expectedState);
  });

  it('should set "isFullOfferDataLoading" to "false", "isFullOfferLoadingError" to "true" with "fetchOfferDataAction.rejected"', () => {
    const expectedState = {...initialState, isFullOfferDataLoading: false, isFullOfferLoadingError: true};
    const result = fullOfferProcessSlice.reducer(undefined, fetchOfferDataAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "isNearbyPlacesDataLoading" to "true" with "fetchNearbyPlacesAction.pending"', () => {
    const expectedState = {...initialState, isNearbyPlacesDataLoading: true};
    const result = fullOfferProcessSlice.reducer(undefined,fetchNearbyPlacesAction.pending('', mockFullOffer.id));
    expect(result).toEqual(expectedState);
  });

  it('should set "nearbyPlaces" to an array with nearby places information with "fetchNearbyPlacesAction.fulfilled"', () => {
    const expectedState = {...initialState, nearbyPlaces: mockOffers};
    const result = fullOfferProcessSlice.reducer(undefined, fetchNearbyPlacesAction.fulfilled(mockOffers, '', mockFullOffer.id));
    expect(result).toEqual(expectedState);
  });
});
