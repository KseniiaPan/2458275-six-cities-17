import {NameSpace} from '../../consts';
import {mockFavoriteOffer} from '../../utils/mocks';
import {getFavoriteOffersData, getFavoriteOffersLoadingStatus, getFavoriteStatusById} from './selectors';

describe('FavoriteProcess selectors', () => {
  const state = {
    [NameSpace.Favorite]: {
      favoriteOffers: [mockFavoriteOffer],
      isFavoriteOffersDataLoading: true,
    }
  };

  it('should return favorite offers from state', () => {
    const { favoriteOffers } = state[NameSpace.Favorite];
    const result = getFavoriteOffersData(state);
    expect(result).toEqual(favoriteOffers);
  });

  it('should return favorite offers loading status', () => {
    const { isFavoriteOffersDataLoading } = state[NameSpace.Favorite];
    const result = getFavoriteOffersLoadingStatus(state);
    expect(result).toBe(isFavoriteOffersDataLoading);
  });

  it('should return offer favorite status', () => {
    const mockOfferId = mockFavoriteOffer.id;
    const result = getFavoriteStatusById(state, mockOfferId);
    expect(result).toBe(true);
  });
});
