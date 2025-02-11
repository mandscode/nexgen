import { FETCH_IMAGES_REQUEST, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAILURE } from '../actions/actionTypes';

interface ImagesState {
  loading: boolean;
  images: string[] | null;
  error: string | null;
}

const initialState: ImagesState = {
  loading: false,
  images: null,
  error: null,
};

export const imagesReducer = (state = initialState, action: any): ImagesState => {
  switch (action.type) {
    case FETCH_IMAGES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_IMAGES_SUCCESS:
      return { ...state, loading: false, images: action.payload };
    case FETCH_IMAGES_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
