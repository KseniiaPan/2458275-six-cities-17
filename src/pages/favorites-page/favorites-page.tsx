import {Helmet} from 'react-helmet-async';
import {LogoType} from '../../consts';
import {useAppSelector} from '../../hooks/index';
import {getFavoriteOffersData, getFavoriteOffersLoadingStatus} from '../../store/favorite-process-slice/selectors';
import LoadingPage from '../../pages/loading-page/loading-page';
import Header from '../../components/header/header';
import Logo from '../../components/logo/logo';
import FavoritePlacesContainer from '../../components/favorite-places-container/favorite-places-container';
import FavoritePlacesEmptyContainer from '../../components/favorite-places-empty-container/favorite-places-empty-container';

function FavoritesPage(){
  const favoriteOffersAmount = useAppSelector(getFavoriteOffersData).length;
  const isFavoriteOffersDataLoading = useAppSelector(getFavoriteOffersLoadingStatus);

  if (isFavoriteOffersDataLoading) {
    return (
      <LoadingPage />
    );
  }
  return (
    <div className="page">
      <Helmet>
        <title>6 cities: Favorites</title>
      </Helmet>
      <Header/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoriteOffersAmount > 0 ? <FavoritePlacesContainer /> : <FavoritePlacesEmptyContainer />}
        </div>
      </main>
      <footer className="footer container">
        <Logo logoType={LogoType.Footer}/>
      </footer>
    </div>
  );
}

export default FavoritesPage;
