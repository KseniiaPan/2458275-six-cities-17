import { AuthorizationStatus } from '../../consts';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import { userProcessSlice } from './user-process-slice';
import {makeFakeUserData, mockAuthData} from '../../utils/mocks';

describe('UserProcess Slice', () => {
  const mockUserData = makeFakeUserData();

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData
    };
    const result = userProcessSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null
    };
    const result = userProcessSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should set "userData" to an object with user information, should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData
    };
    const result = userProcessSlice.reducer(initialState, checkAuthAction.fulfilled(mockUserData, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null
    };

    const result = userProcessSlice.reducer(initialState, checkAuthAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "userData" to an object with user information and should set "Auth" with "loginAction.fulfilled" action', () => {
    const initialState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null
    };
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData
    };
    const result = userProcessSlice.reducer(initialState, loginAction.fulfilled(mockUserData, '', mockAuthData));
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState = {authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null
    };
    const expectedState = {authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null
    };
    const result = userProcessSlice.reducer(initialState, loginAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" and should set "userData" to null with "logoutAction.fulfilled" action', () => {
    const initialState = {authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData
    };
    const expectedState = {authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null
    };
    const result = userProcessSlice.reducer(initialState, logoutAction.fulfilled);
    expect(result).toEqual(expectedState);
  });

  it('should retain "Auth", should retain "userData" as an object with user data with "logoutAction.rejected" action', () => {
    const initialState = {authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData
    };
    const expectedState = {authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData
    };
    const result = userProcessSlice.reducer(initialState, logoutAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
