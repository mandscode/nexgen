import { FETCH_INVESTOR_ACC_REQUEST, FETCH_INVESTOR_ACC_SUCCESS, FETCH_INVESTOR_ACC_FAILURE } from '../actions/actionTypes';
import { getAccountOfInvestor } from '../../api/apiEndpoints';
import { Dispatch } from 'redux';

export class AccountRespDTO {
    id?: number;
    currency!: string;
    investorId!: number;
    transactions?: TransactionDTO[];
}

export class TransactionDTO {
    id?: number;
    details!: { [key: string]: any };
    projectId!: number;
    accountId!: number;
    amount!: number;
    credited!: boolean;
    modifiedBy?: string;
    intrestRate!: number;
}

export const fetchInvestorAccRequest = () => ({
    type: FETCH_INVESTOR_ACC_REQUEST,
});

export const fetchInvestorAccSuccess = (accounts: AccountRespDTO) => ({
    type: FETCH_INVESTOR_ACC_SUCCESS,
    payload: accounts,
});

export const fetchInvestorAccFailure = (error: string) => ({
    type: FETCH_INVESTOR_ACC_FAILURE,
    error,
});

// Async action to fetch user details
export const fetchInvestorAccById = (investorId: number) => {
    return async (dispatch:Dispatch) => {
        dispatch(fetchInvestorAccRequest());
        try {

            const response = await getAccountOfInvestor(investorId); // Replace with your API endpoint
            // Extract and validate the data
            const investorData = response;
            // Dispatch success action with the extracted data
            dispatch(fetchInvestorAccSuccess(investorData));
            
        } catch (error:any) {
            dispatch(fetchInvestorAccFailure(error.message));
        }
    }
};