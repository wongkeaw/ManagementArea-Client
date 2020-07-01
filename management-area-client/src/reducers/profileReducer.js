import {
  PROFILE_GET,
  PROFILE_IMAGE,
  PROFILE_MODE_EDIT,
  PROFILE_FROM_ERROR,
} from "../actions/types";

const initialState = {
  profile: {},
  image: {},
  mode_edit: false,
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_GET:
      if (state.profile.blackguardImageFileSource !== undefined) {
        action.payload.blackguardImageFileSource =
          state.profile.blackguardImageFileSource;
        action.payload.profileImageFileSource =
          state.profile.profileImageFileSource;
      }
      return {
        ...state,
        profile: action.payload,
      };

    case PROFILE_IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    case PROFILE_MODE_EDIT:
      return {
        ...state,
        mode_edit: action.payload,
      };
    case PROFILE_FROM_ERROR:
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
}
