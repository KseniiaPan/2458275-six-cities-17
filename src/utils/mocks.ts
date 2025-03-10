import {datatype, address, image, internet} from 'faker';
import {Offer, OfferCity, OfferHostInfo, FullOffer, Location} from '../types/offers-types';
import {Review} from '../types/reviews-types';
import {UserData} from '../types/user-data';
import {getRandomCity, getRandomAccommodation} from '../utils/common';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {createAPI} from '../services/api';
import {State} from '../types/state-types';

export const makeFakeOfferLocation = ():Location => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: datatype.number(),
});

export const makeFakeCity = (): OfferCity => ({
  name: getRandomCity().name,
  location: getRandomCity().location,
});

export const makeFakeOffer = (): Offer => ({
  id: datatype.string(),
  title: datatype.string(),
  type: getRandomAccommodation(),
  price: datatype.number(),
  city: makeFakeCity(),
  location: makeFakeOfferLocation(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  previewImage: image.imageUrl(),
});

export const makeFakeOfferHostInfo = ():OfferHostInfo => ({
  name: internet.userName(),
  avatarUrl: internet.avatar(),
  isPro: datatype.boolean(),
});

export const makeFakeFullOffer = (): FullOffer => ({
  id: datatype.string(),
  title: datatype.string(),
  type: getRandomAccommodation(),
  price: datatype.number(),
  city: makeFakeCity(),
  location: makeFakeOfferLocation(),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  description:  datatype.string(),
  bedrooms: datatype.number(),
  goods: [ datatype.string()],
  host: makeFakeOfferHostInfo(),
  images: [image.imageUrl()],
  maxAdults: datatype.number(),
});


export const makeFakeReview = ():Review => ({
  id: datatype.string(),
  date: datatype.string(),
  rating: datatype.number(),
  comment: datatype.string(),
  user: {
    name: internet.userName(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
  }
});

export const makeFakeUserData = ():UserData => ({
  id: datatype.number(),
  email: internet.email(),
  token: datatype.string(),
});

export const mockOffers = new Array(20).fill(null).map(() => makeFakeOffer());
export const mockReviews = new Array(10).fill(null).map(() => makeFakeReview());
export const mockFavoriteOffer = { ...makeFakeOffer(), isFavorite: true };
export const mockNotFavoriteOffer = { ...makeFakeOffer(), isFavorite: false };

export const mockAuthData = {
  email: internet.email(),
  password: datatype.string(),
};

export const mockComment = {
  rating: datatype.number(),
  comment: datatype.string(),
};

export const mockReviewData = {
  id: datatype.string(),
  comment: mockComment,
};

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
