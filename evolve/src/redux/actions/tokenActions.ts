import { TOKEN_FAILURE, TOKEN_REQUEST, TOKEN_SUCCESS } from "./actionTypes";

export const tokenRequest = () => ({
    type: TOKEN_REQUEST,
});

export const tokenSuccess = (token: string) => ({
    type: TOKEN_SUCCESS,
    payload: token,
});

export const tokenFailure = (error: string) => ({
    type: TOKEN_FAILURE,
    error,
});
  