import { FETCH_INVESTOR_REQUEST, FETCH_INVESTOR_SUCCESS, FETCH_INVESTOR_FAILURE } from '../actions/actionTypes';
import { getInvestor } from '../../api/apiEndpoints';
import { Dispatch } from 'redux';

export interface InvestorDetails {
    id?: number;
    nomineeDetails?: { [key: string]: any };
    emergencyContact: any;
    personalDetails?: { [key: string]: any };
    userId: number;
    ownerId?: string;
    caId?: string;
    settings?: { [key: string]: any };
    accounts?: AccountRespDTO[];
    projects?: ProjectRespDTO[];
    resources?: ResourceDTO[];
}

export class ResourceDTO {
    id?: number;
    location!: string;
    sourceId?: string;
    type!: string;
    group!: string;
}

export class ProjectRespDTO {
    id?: number;
    name!: string;
    address!: string;
    latitude?: number;
    longitude?: number;
    startDate!: Date;
    actualMaturityDate?: Date;
    overallCost?: number;
    description?: string;
    ownerName?: string;
    legalId?: string;
    maturityLockingPeriod?: number;
    settings?: { [key: string]: any };
    entity!: EntityDTO;
    resources?: ResourceDTO[];
}

export class EntityDTO {
    id?: number;
    name!: string;
    address!: string;
    country!: string;
    regId!: string;
    ownerId?: string;
    caId?: string;
    settings?: { [key: string]: any };
}


export class AccountRespDTO {
    id?: number;
    currency!: string;
    investorId!: number;
    transactions?: TransactionDTO[];
    investments?: InvestmentDTO[];
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

export class InvestmentDTO {
    id?: number;
    investmentType!: string;
    amount!: number;
    accountId!: number;
    modifiedBy?: string;
}

export const fetchInvestorRequest = () => ({
    type: FETCH_INVESTOR_REQUEST,
});

export const fetchInvestorSuccess = (investor: InvestorDetails) => ({
    type: FETCH_INVESTOR_SUCCESS,
    payload: investor,
});

export const fetchInvestorFailure = (error: string) => ({
    type: FETCH_INVESTOR_FAILURE,
    error,
});

// Async action to fetch user details
export const fetchInvestorById = (investorId: number) => {
    return async (dispatch:Dispatch) => {
        dispatch(fetchInvestorRequest());
        try {

            const response = await getInvestor(investorId); // Replace with your API endpoint
            // Extract and validate the data
            const investorData = response.data as InvestorDetails;
            // Dispatch success action with the extracted data
            dispatch(fetchInvestorSuccess(investorData));
            
        } catch (error:any) {
            dispatch(fetchInvestorFailure(error.message));
        }
    }
};