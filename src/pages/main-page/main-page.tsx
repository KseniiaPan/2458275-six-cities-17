import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import LocationsList from '../../components/locations-list/locations-list';
import PacesEmptyContainer from '../../components/places-empty-container/places-empty-container';
import LoadingPage from '../../pages/loading-page/loading-page';
import PlacesContainer from '../../components/places-container/places-container';
import {useAppSelector} from '../../hooks/index';
import {getOffersData, getOffersLoadingStatus} from '../../store/offers-process-slice/selectors';
import {getCurrentCity} from '../../store/app-process-slice/selectors';

function MainPage(){
  const offers = useAppSelector(getOffersData);
  const currentCity = useAppSelector(getCurrentCity);
  const isDataLoading = useAppSelector(getOffersLoadingStatus);

  const cityOffers = offers.filter((offer) => offer.city.name === currentCity.name);
  const mainClassName = `page__main page__main--index ${cityOffers.length === 0 && 'page__main--index-empty'}`;
  if (isDataLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />
      <main className={mainClassName}>
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList currentCity={currentCity}/>
        <div className="cities">
          {cityOffers.length > 0 ?
            <PlacesContainer currentLocation={currentCity} offers={cityOffers}/> : <PacesEmptyContainer currentLocation={currentCity}/> }
        </div>
      </main>
    </div>
  );
}

export default MainPage;
