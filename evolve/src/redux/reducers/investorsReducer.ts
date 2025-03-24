import { FETCH_INVESTORS_FAILURE, FETCH_INVESTORS_REQUEST, FETCH_INVESTORS_SUCCESS } from '../actions/actionTypes';
import { InvestorsDetails } from '../actions/investorsActions';

interface InvestorsState {
    loading: boolean;
    investors: InvestorsDetails | null;
    error: string | null;
}

const initialState: InvestorsState = {
    loading: false,
    investors: null,
    error: null,
};

export const investorsReducer = (state = initialState, action:any):InvestorsState => {
    switch (action.type) {
        case FETCH_INVESTORS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_INVESTORS_SUCCESS:
            return { ...state, loading: false, investors: action.payload };
        case FETCH_INVESTORS_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};