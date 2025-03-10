import {useMemo} from 'react';
import {FavouriteButtonType, AuthorizationStatus, AppRoute, BookmarkSize} from '../../consts';
import { getAuthorizationStatus } from '../../store/user-process-slice/selectors';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/index';
import {getFavoriteStatusById} from '../../store/favorite-process-slice/selectors';
import {toggleFavoriteSatusAction} from '../../store/api-actions';

type FavoriteButtonProps = {
  offerId: string;
  buttonType: FavouriteButtonType;
}

function FavoriteButton ({ offerId, buttonType}: FavoriteButtonProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorisationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthorised = useMemo(() => authorisationStatus === AuthorizationStatus.Auth, [authorisationStatus]);
  const isFavorite = useAppSelector((state) => getFavoriteStatusById(state, offerId));

  const activeButtonClass = buttonType === FavouriteButtonType.FullOfferButton ? 'offer__bookmark-button--active' : 'place-card__bookmark-button--active';
  const buttonClass = `button ${buttonType === FavouriteButtonType.FullOfferButton ? 'offer__bookmark-button' : 'place-card__bookmark-button'} ${isFavorite && isAuthorised && activeButtonClass}`;

  const bookmarkClass = buttonType === FavouriteButtonType.FullOfferButton ? 'offer__bookmark-icon' : 'place-card__bookmark-icon';
  const bookmarkWidth = buttonType === FavouriteButtonType.FullOfferButton ? BookmarkSize.FullOffer.width : BookmarkSize.PlaceCard.width;
  const bookmarkHeight = buttonType === FavouriteButtonType.FullOfferButton ? BookmarkSize.FullOffer.height : BookmarkSize.PlaceCard.height;

  const handleFavoriteButtonClick = () => {
    if (isAuthorised) {
      dispatch(toggleFavoriteSatusAction({id: offerId, wasFavorite: isFavorite}));
    } else {
      navigate(AppRoute.Login);
    }
  };
  return (
    <button className={buttonClass}
      type="button"
      onClick={handleFavoriteButtonClick}
    >
      <svg className={bookmarkClass} width={bookmarkWidth} height={bookmarkHeight}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>

  );
}

export default FavoriteButton;
