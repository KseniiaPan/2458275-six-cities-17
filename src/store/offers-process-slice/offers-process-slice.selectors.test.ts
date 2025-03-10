import {NameSpace} from '../../consts';
import {mockOffers} from '../../utils/mocks';
import {getOffersData, getOffersLoadingStatus} from './selectors';

describe('OffersProcess selectors', () => {
  const state = {
    [NameSpace.Offers]: {
      offers: mockOffers,
      isOffersDataLoading: false,
    }
  };

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Offers];
    const result = getOffersData(state);
    expect(result).toEqual(offers);
  });

  it('should return offers loading status', () => {
    const { isOffersDataLoading } = state[NameSpace.Offers];
    const result = getOffersLoadingStatus(state);
    expect(result).toBe(isOffersDataLoading);
  });
});
