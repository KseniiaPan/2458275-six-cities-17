import {NameSpace} from '../../consts';
import { State } from '../../types/state-types';
import {Review} from '../../types/reviews-types';


export const getNewReviewPostingStatus = (state: Pick<State, NameSpace.Review>): boolean => state[NameSpace.Review].isNewReviewPosting;
export const getReviews = (state: Pick<State, NameSpace.Review>): Review[] => state[NameSpace.Review].reviews;
export const getReviewsLoadingStatus = (state: Pick<State, NameSpace.Review>): boolean => state[NameSpace.Review].isReviewsDataLoading;
