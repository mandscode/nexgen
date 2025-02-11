import { getAcademies } from '../../api/apiEndpoints';
import { Dispatch } from 'redux';
import { FETCH_ACADEMY_FAILURE, FETCH_ACADEMY_REQUEST, FETCH_ACADEMY_SUCCESS } from './actionTypes';

export interface Academy {
  id?: number;
  title: string;
  imageUrl?: string;
  description: string;
}


// Action creators for fetchacademies
export const fetchAcademyRequest = () => ({
  type: FETCH_ACADEMY_REQUEST,
});

export const fetchAcademySuccess = (academies: Academy[]) => ({
  type: FETCH_ACADEMY_SUCCESS,
  payload: academies,
});

export const fetchAcademyFailure = (error: string) => ({
  type: FETCH_ACADEMY_FAILURE,
  error,
});

// Async action to fetch academies and images
export const fetchAcademy = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchAcademyRequest());

    try {
      const response = await getAcademies(); // Fetch academies from your API

      dispatch(fetchAcademySuccess(response)); // Dispatch the academies with image URLs
    } catch (error: any) {
      dispatch(fetchAcademyFailure(error.message)); // Handle failure if API call fails
    }
  };
};
