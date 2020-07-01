import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import fetch from "./fetchReducer";
import profile from "./profileReducer";
import fetchPersonal from "./FetchPersonalReducer";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  fetch: fetch,
  profile: profile,
  fetchPersonal: fetchPersonal,
});
