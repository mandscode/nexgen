import { FETCH_PROJECTS_FAILURE, FETCH_PROJECTS_REQUEST, FETCH_PROJECTS_SUCCESS } from "../actions/actionTypes";
import { Project } from "../actions/projectsActions";


interface ProjectsState {
    loading: boolean;
    projects: Project | null;
    error: string | null;
}

const initialState: ProjectsState = {
    loading: false,
    projects: null,
    error: null,
};

export const projectsReducer = (state = initialState, action:any):ProjectsState => {
    switch (action.type) {
        case FETCH_PROJECTS_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_PROJECTS_SUCCESS:
            return { ...state, loading: false, projects: action.payload };
        case FETCH_PROJECTS_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};