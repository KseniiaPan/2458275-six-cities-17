import {NameSpace, AuthorizationStatus} from '../../consts';
import {makeFakeUserData} from '../../utils/mocks';
import {getAuthorizationStatus, getUserData} from './selectors';

describe('UserProcess selectors', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: makeFakeUserData(),
    }
  };

  it('should return authorization status from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return user data from state', () => {
    const { userData } = state[NameSpace.User];
    const result = getUserData(state);
    expect(result).toEqual(userData);
  });
});
