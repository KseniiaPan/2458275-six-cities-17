import {NameSpace, SortingOption} from '../../consts';
import { State } from '../../types/state-types';
import {OfferCity} from '../../types/offers-types';

export const getCurrentCity = (state: Pick<State, NameSpace.App>): OfferCity => state[NameSpace.App].currentCity;
export const getCurrentSortingOption = (state: Pick<State, NameSpace.App>): SortingOption => state[NameSpace.App].currentSortingOption;
