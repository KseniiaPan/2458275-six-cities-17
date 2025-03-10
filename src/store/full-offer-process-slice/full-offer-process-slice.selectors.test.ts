import {NameSpace} from '../../consts';
import {makeFakeFullOffer, mockOffers} from '../../utils/mocks';
import {getFullOfferData, getNearbyPlaces, getFullOfferLoadingStatus, getFullOfferErrorStatus, getNearbyPlacesLoadingStatus} from './selectors';

describe('FullOfferProcess selectors', () => {
  const state = {
    [NameSpace.FullOffer]: {
      fullOfferData: makeFakeFullOffer(),
      nearbyPlaces: mockOffers,
      isFullOfferDataLoading: true,
      isFullOfferLoadingError: false,
      isNearbyPlacesDataLoading: true,
    }
  };

  it('should return full offer data from state', () => {
    const { fullOfferData } = state[NameSpace.FullOffer];
    const result = getFullOfferData(state);
    expect(result).toEqual(fullOfferData);
  });

  it('should return full offer loading status', () => {
    const { isFullOfferDataLoading } = state[NameSpace.FullOffer];
    const result = getFullOfferLoadingStatus(state);
    expect(result).toBe(isFullOfferDataLoading);
  });

  it('should return full offer loading error status', () => {
    const { isFullOfferLoadingError } = state[NameSpace.FullOffer];
    const result = getFullOfferErrorStatus(state);
    expect(result).toBe(isFullOfferLoadingError);
  });

  it('should return nearby places from state', () => {
    const { nearbyPlaces } = state[NameSpace.FullOffer];
    const result = getNearbyPlaces(state);
    expect(result).toEqual(nearbyPlaces);
  });

  it('should return nearby places data loading status', () => {
    const { isNearbyPlacesDataLoading } = state[NameSpace.FullOffer];
    const result = getNearbyPlacesLoadingStatus(state);
    expect(result).toBe(isNearbyPlacesDataLoading);
  });
});
