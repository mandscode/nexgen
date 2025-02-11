// reducers/userReducer.ts
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from '../actions/actionTypes';
import { UserDetails } from '../actions/userActions';

interface UserState {
    loading: boolean;
    user: UserDetails | null;
    error: string | null;
}

const initialState: UserState = {
    loading: false,
    user: null,
    error: null,
};

export const userReducer = (state = initialState, action:any):UserState => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };
            case FETCH_USER_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};