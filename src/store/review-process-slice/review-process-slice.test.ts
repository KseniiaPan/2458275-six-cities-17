import {reviewProcessSlice} from './review-process-slice';
import {fetchOfferReviewsAction, postCommentAction} from '../api-actions';
import {mockReviews, makeFakeReview, mockReviewData} from '../../utils/mocks';

describe('ReviewProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      reviews: mockReviews,
      isNewReviewPosting: false,
      isReviewsDataLoading: true,
    };
    const result = reviewProcessSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      reviews: [],
      isNewReviewPosting: false,
      isReviewsDataLoading: true,
    };
    const result = reviewProcessSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewsDataLoading" to "true" with "fetchOfferReviewsAction.pending"', () => {
    const expectedState = {
      reviews: [],
      isNewReviewPosting: false,
      isReviewsDataLoading: true,

    };
    const result = reviewProcessSlice.reducer(undefined, fetchOfferReviewsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to an array with reviews with "fetchOfferReviewsAction.fulfilled"', () => {
    const expectedState = {
      reviews: mockReviews,
      isNewReviewPosting: false,
      isReviewsDataLoading: true,

    };
    const result = reviewProcessSlice.reducer(undefined, fetchOfferReviewsAction.fulfilled(mockReviews, '', ''));
    expect(result).toEqual(expectedState);
  });

  it('should set "isNewReviewPosting" to "true" with "postCommentAction.pending"', () => {
    const expectedState = {
      reviews: [],
      isNewReviewPosting: true,
      isReviewsDataLoading: true,

    };
    const result = reviewProcessSlice.reducer(undefined, postCommentAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should set "isNewReviewPosting" to "false", add new review to the store with "postCommentAction.fulfilled"', () => {
    const newReview = makeFakeReview();
    const expectedState = {
      reviews: [newReview],
      isNewReviewPosting: false,
      isReviewsDataLoading: true,
    };
    const result = reviewProcessSlice.reducer(undefined, postCommentAction.fulfilled(newReview, '', mockReviewData));
    expect(result).toEqual(expectedState);
  });

  it('should set "isNewReviewPosting" to "false" with "postCommentAction.rejected"', () => {
    const expectedState = {
      reviews: [],
      isNewReviewPosting: false,
      isReviewsDataLoading: true,

    };
    const result = reviewProcessSlice.reducer(undefined, postCommentAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
