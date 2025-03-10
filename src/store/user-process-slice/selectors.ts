import {NameSpace, AuthorizationStatus} from '../../consts';
import { State } from '../../types/state-types';
import {UserData} from '../../types/user-data';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserData = (state: Pick<State, NameSpace.User>): UserData | null => state[NameSpace.User].userData;
