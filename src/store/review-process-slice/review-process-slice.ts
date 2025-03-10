import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../consts';
import {ReviewProcess} from '../../types/state-types';
import {fetchOfferReviewsAction, postCommentAction} from '../api-actions';
import {toast} from 'react-toastify';


const initialState: ReviewProcess = {
  reviews: [],
  isNewReviewPosting: false,
  isReviewsDataLoading: true,
};

export const reviewProcessSlice = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchOfferReviewsAction.rejected, () => {
        toast.warn('Something went wrong while loading reviews. If you want to see the reviews, try reloading the page');
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isNewReviewPosting = true;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.isNewReviewPosting = false;
        state.reviews.push(action.payload);
        toast.success('Your review is posted');
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.isNewReviewPosting = false;
        toast.error('Something went wrong while posting your review. Please try again, your opinion is really important for us');
      });
  }
});
