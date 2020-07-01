import axios from "axios";
import store from "./../store";
import { logout } from "./securityActions";
import {
  PROFILE_GET,
  PROFILE_IMAGE,
  PROFILE_MODE_EDIT,
  PROFILE_FROM_ERROR,
} from "./types";

export const getProfile = (userId, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/usersMA/${userId}`);
    res.data.mode = 0;
    dispatch({
      type: PROFILE_GET,
      payload: res.data,
    });
  } catch (err) {
    store.dispatch(logout());
  }
};

export const receiveImgUserProfile = (img) => async (dispatch) => {
  try {
    console.log("receiveImgUserProfile : Load Image =>" + img);
    const config = {
      responseType: "arraybuffer",
    };
    const res = await axios.get(
      `/api/usersMA/file/downloadFile/${img}`,
      config
    );

    const base64 = btoa(
      new Uint8Array(res.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );

    var data = {
      name: img,
      source: "data:;base64," + base64,
    };
    dispatch({
      type: PROFILE_IMAGE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateImage = (file, img) => async (dispatch) => {
  console.log("updateImage : update Image =>" + img);
  try {
    if (file !== undefined) {
      var reader = new FileReader();
      reader.onload = (readerEvt) => {
        var binaryString = readerEvt.target.result;
        // setup image
        var data = {
          name: img,
          source: "data:;base64," + btoa(binaryString),
        };
        dispatch({
          type: PROFILE_IMAGE,
          payload: data,
        });
      };
      reader.readAsBinaryString(file);
    }
  } catch (err) {
    console.log(err);
  }
};

export const uploadFiles = (file, uploadType) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploadType", uploadType);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    await axios.post("/api/usersMA/file/uploadFile", formData, config);
  } catch (err) {
    console.log(err);
  }
};
export const updateMode = (newMode) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_MODE_EDIT,
      payload: newMode,
    });
  } catch (err) {
    console.log(err);
  }
};
export const updateProfile = (newProfile) => async (dispatch) => {
  try {
    const res = await axios.post("/api/usersMA/update", newProfile);
    window.alert("Update user information is successed.");

    dispatch({
      type: PROFILE_MODE_EDIT,
      payload: false,
    });

    dispatch({
      type: PROFILE_GET,
      payload: res.data,
    });

    // reset error
    dispatch({
      type: PROFILE_FROM_ERROR,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: PROFILE_FROM_ERROR,
      payload: err.response.data,
    });
  }
};
