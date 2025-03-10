import {NameSpace} from '../../consts';
import { State } from '../../types/state-types';
import {FullOffer, Offer} from '../../types/offers-types';

export const getFullOfferData = (state: Pick<State, NameSpace.FullOffer>): FullOffer | null => state[NameSpace.FullOffer].fullOfferData;
export const getNearbyPlaces = (state: Pick<State, NameSpace.FullOffer>): Offer[]=> state[NameSpace.FullOffer].nearbyPlaces;
export const getFullOfferLoadingStatus = (state: Pick<State, NameSpace.FullOffer>): boolean => state[NameSpace.FullOffer].isFullOfferDataLoading;
export const getFullOfferErrorStatus = (state: Pick<State, NameSpace.FullOffer>): boolean => state[NameSpace.FullOffer].isFullOfferLoadingError;
export const getNearbyPlacesLoadingStatus = (state: Pick<State, NameSpace.FullOffer>): boolean => state[NameSpace.FullOffer].isNearbyPlacesDataLoading;


