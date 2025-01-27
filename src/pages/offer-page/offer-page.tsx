import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import Rating from '../../components/rating/rating';
import OfferHost from '../../components/offer-host/offer-host';
import OffersList from '../../components/offers-list/offers-list';
import ReviewsContainer from '../../components/reviews-container/reviews-container';
import OfferInsideList from '../../components/offer-inside-list/offer-inside-list';
import Map from '../../components/map/map';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {CardType, MapTypes, OfferCardCount, FavouriteButtonType, ImagesCount} from '../../consts';
import LoadingPage from '../../pages/loading-page/loading-page';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {fetchOfferDataAction, fetchOfferReviewsAction, fetchNearbyPlacesAction} from '../../store/api-actions';
import {capitalize, getMapPoints} from '../../utils/common';
import {getCurrentCity} from '../../store/app-process-slice/selectors';
import {getFullOfferLoadingStatus, getNearbyPlacesLoadingStatus, getFullOfferData, getNearbyPlaces} from '../../store/full-offer-process-slice/selectors';
import {getReviewsLoadingStatus} from '../../store/review-process-slice/selectors';

function OfferPage(): JSX.Element {
  const currentCity = useAppSelector(getCurrentCity);
  const isFullOfferLoading = useAppSelector(getFullOfferLoadingStatus);
  const isReviewsDataLoading = useAppSelector(getReviewsLoadingStatus);
  const isNearbyPlacesDataLoading = useAppSelector(getNearbyPlacesLoadingStatus);
  const currentOfferData = useAppSelector(getFullOfferData);
  const nearbyPlaces = useAppSelector(getNearbyPlaces).slice(OfferCardCount.Min, OfferCardCount.Max);

  const params = useParams();
  const activeOfferId = params.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeOfferId) {
      dispatch(fetchOfferDataAction(activeOfferId)).then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchOfferReviewsAction(activeOfferId));
          dispatch(fetchNearbyPlacesAction(activeOfferId));
        }
      });
    }
  }, [activeOfferId, dispatch]);

  if (isFullOfferLoading && isReviewsDataLoading && isNearbyPlacesDataLoading) {
    return (
      <LoadingPage />
    );
  }

  if (!currentOfferData) {
    return <NotFoundPage />;
  }

  const { isPremium, description, rating, type, bedrooms, maxAdults, price, title, goods, host, images } = currentOfferData;
  const mapPoints = getMapPoints(nearbyPlaces, currentOfferData);
  const displayedImages = images.slice(ImagesCount.Min, ImagesCount.Max);

  return (
    <div className="page">
      <Helmet>
        <title>6 cities: Offer</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={displayedImages}/>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (<div className="offer__mark"><span>Premium</span></div>)}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                { activeOfferId && <FavoriteButton buttonType={FavouriteButtonType.FullOfferButton} offerId={activeOfferId} /> }
              </div>
              <Rating ratingType={'averageOfferRating'} ratingValue={rating}/>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{capitalize(type)}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} {bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                </li>
                <li className="offer__feature offer__feature--adults">
              Max {maxAdults} {maxAdults > 1 ? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <OfferInsideList goods={goods}/>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <OfferHost name={host.name} avatarUrl={host.avatarUrl} isPro={host.isPro}/>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <ReviewsContainer/>
            </div>
          </div>
          <Map mapPoints={mapPoints} cityLocation={currentCity.location} activeOffer={activeOfferId} mapType={MapTypes.Offer}/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
          Other places in the neighbourhood
            </h2>
            {nearbyPlaces && (
              <div className="near-places__list places__list">
                <OffersList offers={nearbyPlaces} cardType={CardType.Offer}/>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
