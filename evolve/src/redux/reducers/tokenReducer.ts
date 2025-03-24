// src/redux/reducers/tokenReducer.ts
import {
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_FAILURE,
  RESET_STATE,
} from "../actions/actionTypes";

export interface TokenState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TokenState = {
  token: null,
  loading: false,
  error: null,
};

const tokenReducer = (
  state = initialState, // Explicit default state
  action:any
): TokenState => {
  switch (action.type) {
    case TOKEN_REQUEST:
      return { ...state, loading: true };
    case TOKEN_SUCCESS:
      return { ...state, loading: false, token: action.payload, error: null };
    case TOKEN_FAILURE:
      return { ...state, loading: false, error: action.error };
    case RESET_STATE: // Reset to initial state on logout
      return initialState;
    default:
      return state;
  }
};

export default tokenReducer;