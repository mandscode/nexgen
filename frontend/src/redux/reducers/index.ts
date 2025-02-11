import { combineReducers } from "redux";
import tokenReducer from "./tokenReducer";
import { userReducer } from "./userReducer";
import { investorReducer } from "./investorReducer";
import { investorsReducer } from "./investorsReducer";
import { investorAccReducer } from "./investorAccReducer";
import { projectsReducer } from "./projectsReducer";
import { RESET_STATE } from "../actions/actionTypes";
import storage from "redux-persist/lib/storage";
import { imagesReducer } from "./fetchImagesReducer";
import { academiesReducer } from "./academyReducer";

const appReducer = combineReducers({
  token: tokenReducer, // This associates the `token` key with the `tokenReducer` function
  userDetails: userReducer, // This associates the `token` key with the `tokenReducer` function
  investorDetails: investorReducer, // This associates the `token` key with the `tokenReducer` function
  investorsDetails: investorsReducer, // This associates the `token` key with the `tokenReducer` function
  investorAccsDetails: investorAccReducer, // This associates the `token` key with the `tokenReducer` function
  projectsDetail: projectsReducer, // This associates the `token` key with the `tokenReducer` function
  projectImages: imagesReducer, // This associates the `token` key with the `tokenReducer` function
  academiesDetail: academiesReducer, // This associates the `token` key with the `tokenReducer` function
});

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STATE) {
    // Clear the persisted storage
    storage.removeItem("persist:root");
    // Reset Redux state
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
