import { FETCH_INVESTOR_FAILURE, FETCH_INVESTOR_REQUEST, FETCH_INVESTOR_SUCCESS } from '../actions/actionTypes';
import { InvestorDetails } from '../actions/investorActions';

interface InvestorState {
    loading: boolean;
    investor: InvestorDetails | null;
    error: string | null;
}

const initialState: InvestorState = {
    loading: false,
    investor: null,
    error: null,
};

export const investorReducer = (state = initialState, action:any):InvestorState => {
    switch (action.type) {
        case FETCH_INVESTOR_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_INVESTOR_SUCCESS:
            return { ...state, loading: false, investor: action.payload };
        case FETCH_INVESTOR_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};