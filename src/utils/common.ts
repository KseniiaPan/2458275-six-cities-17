import {Offer, FullOffer} from '../types/offers-types';
import {Review} from '../types/reviews-types';
import {SortingOption, cities, accommodationTypes} from '../consts';

const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);

const getRatingValue = (rating: number): string => {
  const ratingProcents = `${Math.round(rating) * 20}%`;
  return ratingProcents;
};

const groupOffersByCity = (offers: Offer[]) => offers.reduce((groupedOffers: Record<string, Offer[]>, offer) => {
  if (!Object.hasOwn(groupedOffers, offer.city.name)) {
    groupedOffers[offer.city.name] = [];
  }
  groupedOffers[offer.city.name].push(offer);
  return groupedOffers;
}, {});

const getFormattedDate = (date:string) => new Date(date).toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric',
});

const getDateWithoutTime = (date:string):string => date.split('T')[0];

const getMapPoints = (offers: Offer[], fullOffer?: FullOffer) => {
  const mapPoints = offers.map(({id, location}) => ({id, location}));
  if(fullOffer) {
    return mapPoints .concat({
      id: fullOffer.id,
      location: fullOffer.location,
    });
  }
  return mapPoints;
};

const getRandomCity = () => cities[Math.floor(Math.random() * cities.length)];
const getRandomAccommodation = () => accommodationTypes[Math.floor(Math.random() * accommodationTypes.length)];

const sortBy = {
  [SortingOption.Default]: (offers:Offer[]) => [...offers],
  [SortingOption.MinPriceFirst]: (offers:Offer[]) => [...offers].sort((firstCard, secondCard) => firstCard.price - secondCard.price),
  [SortingOption.MaxPriceFirst]: (offers:Offer[]) => [...offers].sort((firstCard, secondCard) => secondCard.price - firstCard.price),
  [SortingOption.TopRatedFirst]: (offers:Offer[]) => [...offers].sort((firstCard, secondCard) => secondCard.rating - firstCard.rating),
};

const sortOffers = (offers:Offer[], chosenSortingOption:SortingOption) => sortBy[chosenSortingOption](offers);

const sortReviews = (reviews: Review[]) => reviews.toSorted((reviewA, reviewB) => Date.parse(reviewB.date) - Date.parse(reviewA.date));

export {capitalize, getRatingValue, groupOffersByCity, getFormattedDate, getDateWithoutTime, getMapPoints, sortOffers, sortReviews, getRandomCity, getRandomAccommodation};
