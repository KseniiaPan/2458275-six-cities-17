import {Link} from 'react-router-dom';
import {Offer} from '../../types/offers-types';
import {capitalize, getRatingValue} from '../../utils/common';
import {AppRoute, FavouriteButtonType, CardSize} from '../../consts';
import FavoriteButton from '../../components/favorite-button/favorite-button';

type OfferCardProps = {
  offer: Offer;
  onActiveOfferCardChange?: (id: string | null) => void;
  cardType: string;
}

function OfferCard({offer, cardType, onActiveOfferCardChange}: OfferCardProps): JSX.Element {
  const {title, type, price, isPremium, rating, previewImage, id} = offer;
  const cardClassName = cardType === 'favorites' ? 'favorites__card-info place-card__info' : 'place-card__info';
  const cardWidth = cardType === 'favorites' ? CardSize.FavoritesCard.width : CardSize.PlaceCard.width;
  const cardHeight = cardType === 'favorites' ? CardSize.FavoritesCard.height : CardSize.PlaceCard.height;

  return (
    <article className={`${cardType}__card place-card`}
      onMouseEnter={() => onActiveOfferCardChange && onActiveOfferCardChange(id)}
      onMouseLeave={() => onActiveOfferCardChange && onActiveOfferCardChange(null)}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={AppRoute.Offer.replace(':id', id)}>
          <img
            className="place-card__image"
            src={previewImage}
            width={cardWidth}
            height={cardHeight}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={cardClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}&nbsp;</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton buttonType={FavouriteButtonType.PlaceCardButton} offerId={id}/>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingValue(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer.replace(':id', id)}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}
export default OfferCard;
