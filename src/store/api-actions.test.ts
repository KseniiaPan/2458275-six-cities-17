import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes } from '../utils/mocks';
import { State } from '../types/state-types';
import { checkAuthAction, fetchOffersAction, fetchOfferDataAction, fetchOfferReviewsAction, fetchNearbyPlacesAction, loginAction, logoutAction} from './api-actions';
import { APIRoute } from '../consts';
import {mockOffers, makeFakeFullOffer, mockReviews} from '../utils/mocks';
import { AuthData } from '../types/auth-data';
import * as tokenStorage from '../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response is 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled" when server response is 200', async() => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response is 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchOfferDataAction', () => {
    it('should dispatch "fetchOfferDataAction.pending", "fetchOfferDataAction.fulfilled" when server response is 200', async() => {
      const mockId = 'mock-id';
      const mockOffer = makeFakeFullOffer();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockId}`).reply(200, mockOffer);

      await store.dispatch(fetchOfferDataAction(mockId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferDataActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferDataAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferDataAction.pending.type,
        fetchOfferDataAction.fulfilled.type,
      ]);

      expect(fetchOfferDataActionFulfilled.payload)
        .toEqual(mockOffer);
    });

    it('should dispatch "fetchOfferDataAction.pending", "fetchOfferDataAction.rejected" when server response is 400', async () => {
      const mockId = 'mock-id';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockId}`).reply(400, []);

      await store.dispatch(fetchOfferDataAction(mockId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferDataAction.pending.type,
        fetchOfferDataAction.rejected.type,
      ]);
    });
  });

  describe('fetchOfferReviewsAction', () => {
    it('should dispatch "fetchOfferReviewsAction.pending", "fetchOfferReviewsAction.fulfilled" when server response is 200', async() => {
      const mockId = 'mock-id';
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockId}`).reply(200, mockReviews);

      await store.dispatch(fetchOfferReviewsAction(mockId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferReviewsAction.pending.type,
        fetchOfferReviewsAction.fulfilled.type,
      ]);

      expect(fetchOfferReviewsActionFulfilled.payload)
        .toEqual(mockReviews);
    });

    it('should dispatch "fetchOfferReviewsAction.pending", "fetchOfferReviewsAction.rejected" when server response is 400', async () => {
      const mockId = 'mock-id';
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${mockId}`).reply(400, []);

      await store.dispatch(fetchOfferReviewsAction(mockId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferReviewsAction.pending.type,
        fetchOfferReviewsAction.rejected.type,
      ]);
    });
  });

  describe('fetchNearbyPlacesAction', () => {
    it('should dispatch "fetchNearbyPlacesAction.pending", "fetchNearbyPlacesAction.fulfilled" when server response is 200', async() => {
      const mockId = 'mock-id';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockId}${APIRoute.NearbyPlaces}`).reply(200, mockOffers);

      await store.dispatch(fetchNearbyPlacesAction(mockId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchNearbyPlacesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearbyPlacesAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchNearbyPlacesAction.pending.type,
        fetchNearbyPlacesAction.fulfilled.type,
      ]);

      expect(fetchNearbyPlacesActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchNearbyPlacesAction.pending", "fetchNearbyPlacesAction.rejected" when server response is 400', async () => {
      const mockId = 'mock-id';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockId}${APIRoute.NearbyPlaces}`).reply(400, []);

      await store.dispatch(fetchNearbyPlacesAction(mockId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyPlacesAction.pending.type,
        fetchNearbyPlacesAction.rejected.type,
      ]);
    });
  });
  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "loginAction.fulfilled" when server response is 200', async() => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });
  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response is 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
