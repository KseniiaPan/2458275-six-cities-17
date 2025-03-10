export const cities = [
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  }
] as const;

export const accommodationTypes = ['apartment', 'room', 'house', 'hotel'] as const;

export const ratings = [
  {
    value: 5,
    title: 'perfect',
  },
  {
    value: 4,
    title: 'good',
  },
  {
    value: 3,
    title: 'not bad',
  },
  {
    value: 2,
    title: 'badly',
  },
  {
    value: 1,
    title: 'terribly',
  }
];

export const RATING_INITIAL_VALUE = 0;

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum MapType {
  Main = 'cities',
  Offer = 'offer',
}

export enum CardType {
  Main = 'cities',
  Offer = 'near-places',
  Favourites = 'favorites',
}

export enum FavouriteButtonType {
  FullOfferButton = 'FullOfferButton',
  PlaceCardButton = 'PlaceCardButton',
}

export enum LogoType {
  Header = 'header',
  Footer = 'footer',
}

export enum SortingOption {
  Default = 'Popular',
  MinPriceFirst = 'Price: low to high',
  MaxPriceFirst = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments= '/comments',
  NearbyPlaces='/nearby',
  Favourite = 'favorite'
}

export enum NameSpace {
  App = 'App',
  Offers = 'Offers',
  FullOffer = 'FullOffer',
  User = 'User',
  Review = 'Review',
  Favorite = 'Favorite',
}

export const Comment = {
  MinLength: 50,
  MaxLength: 300,
  MinAmount: 0,
  MaxAmount: 10,
  InitialState: '',
};

export const OfferCardsCount = {
  Min: 0,
  Max: 3,
};
export const ImagesCount = {
  Min: 0,
  Max: 6,
};

export const MapIconInfo = {
  iconSize: [27, 39],
  iconAnchor: [20, 40]
};

export const MapIcon = {
  Default: {
    iconUrl: 'img/pin.svg',
    MapIconInfo
  },
  Active: {
    iconUrl: 'img/pin-active.svg',
    MapIconInfo
  },
};

export const BookmarkSize = {
  FullOffer: {
    width: '31',
    height: '33',
  },
  PlaceCard: {
    width: '18',
    height: '19',
  },
};

export const CardSize = {
  FavoritesCard: {
    width: '150',
    height: '110',
  },
  PlaceCard: {
    width: '260',
    height: '200',
  },
};
