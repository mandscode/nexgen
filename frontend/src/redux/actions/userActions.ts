import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../actions/actionTypes';
import { getUser } from '../../api/apiEndpoints';
import { Dispatch } from 'redux';

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
    return async (dispatch:Dispatch) => {
        dispatch(fetchUserRequest());
        try {

            const response = await getUser(userId); // Replace with your API endpoint
            dispatch(fetchUserSuccess(response));
        } catch (error:any) {
            dispatch(fetchUserFailure(error.message));
        }
    }
};