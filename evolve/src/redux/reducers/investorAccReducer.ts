import { FETCH_INVESTOR_ACC_FAILURE, FETCH_INVESTOR_ACC_REQUEST, FETCH_INVESTOR_ACC_SUCCESS } from '../actions/actionTypes';
import { AccountRespDTO } from '../actions/investorAccActions';

interface InvestorState {
    loading: boolean;
    accounts: AccountRespDTO | null;
    error: string | null;
}

const initialState: InvestorState = {
    loading: false,
    accounts: null,
    error: null,
};

export const investorAccReducer = (state = initialState, action:any):InvestorState => {
    switch (action.type) {
        case FETCH_INVESTOR_ACC_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_INVESTOR_ACC_SUCCESS:
            return { ...state, loading: false, accounts: action.payload };
        case FETCH_INVESTOR_ACC_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};