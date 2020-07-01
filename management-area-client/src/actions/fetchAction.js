import axios from "axios";
import {
  FETCH_GET,
  FETCH_IMAGE,
  FETCH_IMAGE_USER_PROFILE,
  FETCH_SHOW_LIMIT,
  FETCH_MODAL_SHOW,
  FETCH_MODAL_DATA,
  FETCH_POST_MODAL_SHOW,
  FETCH_POST_MODAL_SHOW_IMAGE,
  FETCH_MODAL_IMAGE,
  FETCH_MODAL_ERROR,
  FETCH_MODAL_COMMENT,
  FETCH_MODAL_EMOTION,
  FETCH_ITEM_MODAL_COMMENT,
  FETCH_ITEM_MODAL_EMOTION,
  FETCH_LIST_COMMENTED_SHOW,
} from "./types";

export const uploadMultipleFiles = (files, comment) => async (dispatch) => {
  try {
    if (comment.trim().length === 0) {
      const errors = {
        describe: "Write Something.",
      };
      dispatch({
        type: FETCH_MODAL_ERROR,
        payload: errors,
      });
    } else {
      const list = Object.values(files);
      const formData = new FormData();
      list.map((file) => {
        formData.append("files", file);
        return null;
      });
      formData.append("comment", comment);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const res = await axios.post(
        "/api/fetch/file/uploadMultipleFiles",
        formData,
        config
      );
      dispatch({
        type: FETCH_MODAL_IMAGE,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log("upload");
    console.log(err);
  }
};

export const clearImage = () => async (dispatch) => {
  dispatch({
    type: FETCH_POST_MODAL_SHOW_IMAGE,
    payload: [],
  });
};
export const updateImage = (files) => async (dispatch) => {
  try {
    if (files !== undefined) {
      const results = Object.values(files);
      var lists = [];
      results.map((file) => {
        var reader = new FileReader();
        reader.onload = (readerEvt) => {
          var binaryString = readerEvt.target.result;
          // setup image
          lists.push(btoa(binaryString));

          if (files.length === lists.length) {
            dispatch({
              type: FETCH_POST_MODAL_SHOW_IMAGE,
              payload: lists,
            });
          }
        };
        reader.readAsBinaryString(file);
        return null;
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const showPostFetchModal = (isShow) => async (dispatch) => {
  dispatch({
    type: FETCH_POST_MODAL_SHOW,
    payload: isShow,
  });
};

export const showFetchModal = (isShow, data) => async (dispatch) => {
  dispatch({
    type: FETCH_MODAL_SHOW,
    payload: isShow,
  });

  dispatch({
    type: FETCH_MODAL_DATA,
    payload: data,
  });
};

export const getFetch = () => async (dispatch) => {
  /*console.log(`call: /api/fetch/all/${0}`); */
  const res = await axios.get(`/api/fetch/all/${0}`);
  dispatch({
    type: FETCH_GET,
    payload: res.data,
  });
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
      type: FETCH_IMAGE,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
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
        type: FETCH_IMAGE_USER_PROFILE,
        payload: ilist[0],
      });
    } else if (img !== null) {
      /*console.log("receiveImgUserProfile : Load Image =>" + img); */
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
        type: FETCH_IMAGE_USER_PROFILE,
        payload: data,
      });
    } else {
      console.log(img);
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateLimit = (limit, fetch_page) => async (dispatch) => {
  try {
    if (
      fetch_page !== undefined &&
      fetch_page.last !== true &&
      limit >= fetch_page.size * (fetch_page.number + 1)
    ) {
      let number = fetch_page.number + 1;
      /*console.log(`call: /api/fetch/all/${number}`);*/
      const res = await axios.get(`/api/fetch/all/${number}`);
      dispatch({
        type: FETCH_GET,
        payload: res.data,
      });
    }
    if (limit !== undefined) {
      dispatch({
        type: FETCH_SHOW_LIMIT,
        payload: limit,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const postComment = (comment) => async (dispatch) => {
  try {
    const res = await axios.post("/api/fetch/comment", comment);
    dispatch({
      type: FETCH_MODAL_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postFetchItemComment = (comment) => async (dispatch) => {
  try {
    const res = await axios.post("/api/fetch/item/comment", comment);
    dispatch({
      type: FETCH_ITEM_MODAL_COMMENT,
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
      type: FETCH_MODAL_EMOTION,
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
      type: FETCH_ITEM_MODAL_EMOTION,
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
    type: FETCH_LIST_COMMENTED_SHOW,
    payload: show,
  });
};
