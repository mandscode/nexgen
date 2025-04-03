import { getProjects } from '../../api/apiEndpoints';
import { Dispatch } from 'redux';
import { FETCH_PROJECTS_FAILURE, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS } from './actionTypes';
import { RootState } from '../store';

export interface Project {
  id: number;
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  startDate: string; // ISO date string
  actualMaturityDate: string; // ISO date string
  overallCost: number;
  description: string;
  ownerName: string;
  legalId: string;
  maturityLockingPeriod: number;
  settings: any | null; // Adjust `any` if the structure of `settings` is known
  entityID: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  imageUrl?: string; // Add imageUrl to hold the S3 URL
}

// Action creators for fetchProjects
export const fetchProjectsRequest = () => ({
  type: FETCH_PROJECTS_REQUEST,
});

export const fetchProjectsSuccess = (projects: Project[]) => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: projects,
});

export const fetchProjectsFailure = (error: string) => ({
  type: FETCH_PROJECTS_FAILURE,
  error,
});

// Async action to fetch projects and images
export const fetchProjects = () => {
  return async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(fetchProjectsRequest());

    try {
      // Get token from Redux state
      const token = getState().token.token;

      // Fetch projects with token in headers
      const response = await getProjects({
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      dispatch(fetchProjectsSuccess(response));
    } catch (error: any) {
      dispatch(fetchProjectsFailure(error.message));
    }
  };
};
