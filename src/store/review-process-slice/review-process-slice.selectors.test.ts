import {NameSpace} from '../../consts';
import {mockReviews} from '../../utils/mocks';
import {getNewReviewPostingStatus, getReviews, getReviewsLoadingStatus} from './selectors';

describe('ReviewProcess selectors', () => {
  const state = {
    [NameSpace.Review]: {
      reviews: mockReviews,
      isNewReviewPosting: false,
      isReviewsDataLoading: true,
    }
  };

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Review];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return reviews loading status', () => {
    const { isReviewsDataLoading } = state[NameSpace.Review];
    const result = getReviewsLoadingStatus(state);
    expect(result).toBe(isReviewsDataLoading);
  });

  it('should return new review posting status', () => {
    const { isNewReviewPosting } = state[NameSpace.Review];
    const result = getNewReviewPostingStatus(state);
    expect(result).toBe(isNewReviewPosting);
  });
});
