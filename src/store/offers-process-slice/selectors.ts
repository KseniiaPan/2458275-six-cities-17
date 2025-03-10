import {NameSpace} from '../../consts';
import { State } from '../../types/state-types';
import {Offer} from '../../types/offers-types';

export const getOffersData = (state: Pick<State, NameSpace.Offers>): Offer[] => state[NameSpace.Offers].offers;
export const getOffersLoadingStatus = (state: Pick<State, NameSpace.Offers>): boolean => state[NameSpace.Offers].isOffersDataLoading;

