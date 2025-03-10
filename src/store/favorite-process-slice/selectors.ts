import {NameSpace} from '../../consts';
import {State} from '../../types/state-types';
import {Offer} from '../../types/offers-types';

export const getFavoriteOffersData = (state: Pick<State, NameSpace.Favorite>): Offer[] => state[NameSpace.Favorite].favoriteOffers;
export const getFavoriteOffersLoadingStatus = (state: Pick<State, NameSpace.Favorite>): boolean => state[NameSpace.Favorite].isFavoriteOffersDataLoading;
export const getFavoriteStatusById = (state: Pick<State, NameSpace.Favorite>, id: string): boolean => state[NameSpace.Favorite].favoriteOffers.findIndex((offer) => offer.id === id) !== -1;
