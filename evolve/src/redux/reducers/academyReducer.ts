import { Academy } from "../actions/academyActions";
import { FETCH_ACADEMY_FAILURE, FETCH_ACADEMY_REQUEST, FETCH_ACADEMY_SUCCESS } from "../actions/actionTypes";


interface AcademyState {
    loading: boolean;
    academies: Academy | null;
    error: string | null;
}

const initialState: AcademyState = {
    loading: false,
    academies: null,
    error: null,
};

export const academiesReducer = (state = initialState, action:any):AcademyState => {
    switch (action.type) {
        case FETCH_ACADEMY_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_ACADEMY_SUCCESS:
            return { ...state, loading: false, academies: action.payload };
        case FETCH_ACADEMY_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};