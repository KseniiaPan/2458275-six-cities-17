import {fetchFavoriteOffersAction, toggleFavoriteSatusAction} from '../api-actions';
import {favoriteProcessSlice} from './favorite-process-slice';
import {mockFavoriteOffer, mockNotFavoriteOffer} from '../../utils/mocks';

const initialState = {
  favoriteOffers: [],
  isFavoriteOffersDataLoading: false,
};

describe('FavoriteProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favoriteOffers: [],
      isFavoriteOffersDataLoading: false,
    };

    const result = favoriteProcessSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      favoriteOffers: [],
      isFavoriteOffersDataLoading: false,
    };

    const result = favoriteProcessSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isFavoriteOffersDataLoading" to "true" with "fetchFavoriteOffersAction.pending"', () => {
    const expectedState = {
      favoriteOffers: [],
      isFavoriteOffersDataLoading: true,

    };

    const result = favoriteProcessSlice.reducer(undefined, fetchFavoriteOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "isFavoriteOffersDataLoading" to "false", should set favoriteOffers to an array with favorite offers with "fetchFavoriteOffersAction.fulfilled"', () => {
    const expectedState = {
      favoriteOffers: [mockFavoriteOffer],
      isFavoriteOffersDataLoading: false,

    };

    const result = favoriteProcessSlice.reducer(undefined, fetchFavoriteOffersAction.fulfilled([mockFavoriteOffer], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "isFavoriteOffersDataLoading" to "false" with "fetchFavoriteOffersAction.rejected"', () => {
    const expectedState = {
      favoriteOffers: [],
      isFavoriteOffersDataLoading: false,

    };

    const result = favoriteProcessSlice.reducer(
      undefined,
      fetchFavoriteOffersAction.rejected
    );

    expect(result).toEqual(expectedState);
  });


  it('should push the offer to favorites if toggleFavoriteSatusAction is fulfilled and isFavorite is "true" "toggleFavoriteSatusAction.fulfilled"', () => {
    const expectedState = {
      favoriteOffers: [...initialState.favoriteOffers, mockFavoriteOffer],
      isFavoriteOffersDataLoading: false,
    };
    const mockWasFavoriteStatus = false;
    const result = favoriteProcessSlice.reducer(undefined, toggleFavoriteSatusAction.fulfilled(mockFavoriteOffer, '', {
      id: mockFavoriteOffer.id,
      wasFavorite: mockWasFavoriteStatus
    }));

    expect(result).toEqual(expectedState);
  });

  it('should delete the offer from favorites if toggleFavoriteSatusAction is fulfilled and isFavorite is "false" "toggleFavoriteSatusAction.fulfilled"', () => {
    const favoriteOffers = [mockNotFavoriteOffer];
    const favoriteOfferIndex = favoriteOffers.findIndex((offer) => offer.id === mockNotFavoriteOffer.id);
    const mockWasFavoriteStatus = true;
    const expectedState = {
      favoriteOffers: favoriteOffers.splice(favoriteOfferIndex, 1),
      isFavoriteOffersDataLoading: false,
    };
    const result = favoriteProcessSlice.reducer(undefined, toggleFavoriteSatusAction.fulfilled(mockNotFavoriteOffer, '', {
      id: mockNotFavoriteOffer.id,
      wasFavorite: mockWasFavoriteStatus
    }));
    expect(result).not.toEqual(expectedState);
  });
});
