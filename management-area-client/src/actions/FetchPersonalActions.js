import axios from "axios";
import {
  PERSONAL_FETCH_GET,
  PERSONAL_FETCH_USER,
  PERSONAL_FETCH_SHOW_LIMIT,
  PERSONAL_FETCH_MODAL_SHOW,
  PERSONAL_FETCH_MODAL_DATA,
  PERSONAL_FETCH_POST_MODAL_SHOW,
  PERSONAL_FETCH_IMAGE_USER_PROFILE,
  PERSONAL_FETCH_IMAGE,
  PERSONAL_FETCH_MODAL_COMMENT,
  PERSONAL_FETCH_MODAL_EMOTION,
  PERSONAL_FETCH_LIST_COMMENTED_SHOW,
  PERSONAL_FETCH_ITEM_MODAL_COMMENT,
  PERSONAL_FETCH_ITEM_MODAL_EMOTION,
} from "./types";

export const getFetchProfile = (userunique) => async (dispatch) => {
  try {
    /*console.log(`call: /api/usersMA/userunique/${userunique}`); */
    const res = await axios.get(`/api/usersMA/userunique/${userunique}`);
    dispatch({
      type: PERSONAL_FETCH_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getFetchByUser = (userunique) => async (dispatch) => {
  try {
    /*console.log(`call: /api/fetch/findByUser/${0}/${userunique}`);*/
    const res = await axios.get(`/api/fetch/findByUser/${0}/${userunique}`);
    res.data.userunique = userunique;
    dispatch({
      type: PERSONAL_FETCH_GET,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateLimit = (userunique, limit, fetch_page) => async (
  dispatch
) => {
  try {
    if (limit !== undefined) {
      limit = limit + 3;
    }
    if (
      fetch_page !== undefined &&
      fetch_page.last !== true &&
      limit >= fetch_page.size * (fetch_page.number + 1)
    ) {
      let number = fetch_page.number + 1;
      /*console.log(`call: /api/fetch/findByUser/${number}/${userunique}`); */
      const res = await axios.get(
        `/api/fetch/findByUser/${number}/${userunique}`
      );
      res.data.userunique = userunique;
      dispatch({
        type: PERSONAL_FETCH_GET,
        payload: res.data,
      });
    }
    if (limit !== undefined) {
      if (fetch_page !== undefined && limit > fetch_page.totalElements) {
        limit = fetch_page.totalElements;
      }
      dispatch({
        type: PERSONAL_FETCH_SHOW_LIMIT,
        payload: limit,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const showFetchModal = (isShow, data) => async (dispatch) => {
  dispatch({
    type: PERSONAL_FETCH_MODAL_SHOW,
    payload: isShow,
  });

  dispatch({
    type: PERSONAL_FETCH_MODAL_DATA,
    payload: data,
  });
};

export const showPostFetchModal = (isShow) => async (dispatch) => {
  dispatch({
    type: PERSONAL_FETCH_POST_MODAL_SHOW,
    payload: isShow,
  });
};

export const receiveImgUserProfile = (img, fetch_image_list) => async (
  dispatch
) => {
  try {
    /*console.log("receiveImgUserProfile : image name =>" + img);*/

    let ilist = fetch_image_list.filter(
      (fetch_image) => fetch_image.name === img
    );
    if (ilist.length > 0) {
      dispatch({
        type: PERSONAL_FETCH_IMAGE_USER_PROFILE,
        payload: ilist[0],
      });
    } else if (img !== null) {
      /*console.log("receiveImgUserProfile : Load Image =>" + img);*/
      const config = {
        responseType: "arraybuffer",
      };
      const res = await axios.get(`/api/file/downloadFile/${img}`, config);

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
        type: PERSONAL_FETCH_IMAGE_USER_PROFILE,
        payload: data,
      });
    } else {
      console.log(img);
    }
  } catch (err) {
    console.log(err);
  }
};

export const receiveImg = (img) => async (dispatch) => {
  try {
    /*console.log("receiveImg : image name =>" + img);*/
    const config = {
      responseType: "arraybuffer",
    };
    const res = await axios.get(`/api/file/downloadFile/${img}`, config);

    const base64 = btoa(
      new Uint8Array(res.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    let data = {
      name: img,
      source: "data:;base64," + base64,
    };
    dispatch({
      type: PERSONAL_FETCH_IMAGE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const postComment = (comment) => async (dispatch) => {
  try {
    const res = await axios.post("/api/fetch/comment", comment);
    dispatch({
      type: PERSONAL_FETCH_MODAL_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postEmotion = (emotion) => async (dispatch) => {
  try {
    /*console.log("postEmotion : emotion =>" + emotion.emotion); */
    const res = await axios.post("/api/fetch/emotion", emotion);
    dispatch({
      type: PERSONAL_FETCH_MODAL_EMOTION,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setShowListComment = (showComment) => async (dispatch) => {
  var show = false;
  if (showComment === false) {
    show = true;
  }
  dispatch({
    type: PERSONAL_FETCH_LIST_COMMENTED_SHOW,
    payload: show,
  });
};

export const postFetchItemComment = (comment) => async (dispatch) => {
  try {
    const res = await axios.post("/api/fetch/item/comment", comment);
    dispatch({
      type: PERSONAL_FETCH_ITEM_MODAL_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postFetchItemEmotion = (emotion) => async (dispatch) => {
  try {
    /*console.log("postEmotion : emotion =>" + emotion.emotion); */
    const res = await axios.post("/api/fetch/item/emotion", emotion);
    dispatch({
      type: PERSONAL_FETCH_ITEM_MODAL_EMOTION,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
