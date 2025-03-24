import { FETCH_INVESTORS_REQUEST, FETCH_INVESTORS_SUCCESS, FETCH_INVESTORS_FAILURE } from './actionTypes';
import { getInvestors } from '../../api/apiEndpoints';
import { Dispatch } from 'redux';

export interface NomineeDetails {
    mobile: number;
    name: string;
    email: any;
    relation: any;
}

export interface EmergencyContact {
    name: string;
    mobile: number;
    relation: string;
}

export interface InvestorsDetails {
    id?: number;
    userId: string;
    ownerId?: string;
    caId?: string;
    nomineeDetails?: NomineeDetails;
    emergencyContact: EmergencyContact;
    projectIds:any;
}


export const fetchInvestorsRequest = () => ({
    type: FETCH_INVESTORS_REQUEST,
});

export const fetchInvestorsSuccess = (investors: InvestorsDetails) => ({
    type: FETCH_INVESTORS_SUCCESS,
    payload: investors,
});

export const fetchInvestorsFailure = (error: string) => ({
    type: FETCH_INVESTORS_FAILURE,
    error,
});

// Async action to fetch user details
export const fetchInvestors = () => {
    return async (dispatch:Dispatch) => {
        dispatch(fetchInvestorsRequest());
        try {
            const response = await getInvestors(); // Replace with your API endpoint
            dispatch(fetchInvestorsSuccess(response));
        } catch (error:any) {
            dispatch(fetchInvestorsFailure(error.message));
        }
    }
};