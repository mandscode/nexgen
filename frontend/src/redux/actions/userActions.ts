import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../actions/actionTypes';
import { getUser, getUserDetails } from '../../api/apiEndpoints';
import { Dispatch } from 'redux';
import { RootState } from '../store';
import { resetState } from './resetStateAction';

export interface UserDetails {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
}

export const fetchUserRequest = () => ({
    type: FETCH_USER_REQUEST,
});

export const fetchUserSuccess = (user: UserDetails) => ({
    type: FETCH_USER_SUCCESS,
    payload: user,
});

export const fetchUserFailure = (error: string) => ({
    type: FETCH_USER_FAILURE,
    error,
});

// Async action to fetch user details
export const fetchUserById = (userId: number) => {
    return async (dispatch:Dispatch, getState: () => RootState) => {
        dispatch(fetchUserRequest());
        try {
            // Get token from Redux state
            const token = getState().token.token; // Adjust path based on your state structure
      
            if (!token) {
              throw new Error('No authentication token found');
            }
      
            // Pass token to API call
            const response = await getUserDetails(userId, token);
            console.log(response)
            dispatch(fetchUserSuccess(response));
          } catch (error:any) {
            if (error.message === 'Unauthorized: Invalid token' || error.message === 'TokenExpired: Please log in again') {
                // Token is invalid or expired, reset the state
                await dispatch(resetState());
            }
            dispatch(fetchUserFailure(error.message));
        }
    }
};