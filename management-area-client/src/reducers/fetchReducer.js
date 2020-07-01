import {
  FETCH_GET,
  FETCH_IMAGE,
  FETCH_IMAGE_USER_PROFILE,
  FETCH_SHOW_LIMIT,
  FETCH_POST_MODAL_SHOW,
  FETCH_POST_MODAL_SHOW_IMAGE,
  FETCH_MODAL_SHOW,
  FETCH_MODAL_DATA,
  FETCH_MODAL_IMAGE,
  FETCH_MODAL_COMMENT,
  FETCH_MODAL_ERROR,
  FETCH_MODAL_EMOTION,
  FETCH_ITEM_MODAL_COMMENT,
  FETCH_ITEM_MODAL_EMOTION,
  FETCH_LIST_COMMENTED_SHOW,
} from "../actions/types";

const initialState = {
  fetch: [],
  fetch_page: {},
  fetch_length: 0,
  fetch_image: {},
  fetch_image_list: [],
  fetch_show_limit: 3,
  modal_show: false,
  modal_data: {},
  fetch_modal_comment: {},
  fetch_modal_emotion: {},
  fetch_item_modal_comment: {},
  fetch_item_modal_emotion: {},

  post_modal_show: false,
  post_modal_show_image: [],
  post_modal_error: {},
  show_list_comment: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_GET:
      var fetch = state.fetch;
      if (state.fetch_page.number !== action.payload.number) {
        fetch = state.fetch.concat(action.payload.content);
      }
      var vpage = {
        pageable: action.payload.pageable,
        totalPages: action.payload.totalPages,
        totalElements: action.payload.totalElements,
        last: action.payload.last,
        size: action.payload.size,
        number: action.payload.number,
        first: action.payload.first,
      };
      return {
        ...state,
        fetch: fetch,
        fetch_page: vpage,
      };

    case FETCH_MODAL_IMAGE:
      /*console.log("FETCH_MODAL_COMMENT :"); */
      var flist = state.fetch_image_list.filter(
        (fetch_image) => fetch_image.name === action.payload.user.profileImage
      );
      if (flist.length > 0) {
        action.payload.user.profileImageFileSource = flist[0].source;
        action.payload.user.profileImageIsDownload = true;
      }
      state.fetch.unshift(action.payload);
      return {
        ...state,
        fetch: state.fetch,
        fetch_length: state.fetch.length,
        //fetch_show_limit: 5,
        post_modal_error: { error: null },
      };

    case FETCH_MODAL_ERROR:
      return {
        ...state,
        post_modal_error: action.payload,
      };

    case FETCH_MODAL_COMMENT:
      /*console.log("FETCH_MODAL_COMMENT :");*/
      state.fetch.map((fetch, index) => {
        if (fetch.id === action.payload.id) {
          /*begin set user icon*/
          var ilist = state.fetch_image_list.filter(
            (fetch_image) =>
              fetch_image.name === action.payload.fetchComment.user.profileImage
          );
          if (ilist.length > 0) {
            action.payload.fetchComment.user.profileImageFileSource =
              ilist[0].source;
            action.payload.fetchComment.user.profileImageIsDownload = true;
          }
          /*end set user icon*/
          fetch.fetchComments.unshift(action.payload.fetchComment);
        }
        return null;
      });
      return {
        ...state,
        fetch: state.fetch,
        fetch_modal_comment: action.payload,
      };

    case FETCH_ITEM_MODAL_COMMENT:
      /*console.log("FETCH_ITEM_MODAL_COMMENT :");*/
      state.modal_data.fetchItems.map((fetchItem, index) => {
        if (fetchItem.id === action.payload.id) {
          /*begin set user icon*/
          var ilist = state.fetch_image_list.filter(
            (fetch_image) =>
              fetch_image.name === action.payload.fetchComment.user.profileImage
          );
          var user = action.payload.fetchComment.user;
          if (ilist.length > 0) {
            user.profileImageFileSource = ilist[0].source;
            user.profileImageIsDownload = true;
          }
          /*end set user icon*/
          fetchItem.fetchComments.unshift(action.payload.fetchComment);
        }
        return null;
      });
      return {
        ...state,
        fetch: state.fetch,
        fetch_item_modal_comment: action.payload,
      };

    case FETCH_MODAL_EMOTION:
      /*console.log("FETCH_MODAL_COMMENT :");*/
      state.fetch.map((fetch, index) => {
        if (fetch.id === action.payload.id) {
          fetch.fetchEmotions.unshift(action.payload.fetchEmotion);
        }
        return null;
      });
      return {
        ...state,
        fetch_modal_emotion: action.payload,
      };

    case FETCH_ITEM_MODAL_EMOTION:
      /*console.log("FETCH_ITEM_MODAL_EMOTION :");*/
      state.modal_data.fetchItems.map((fetchItem, index) => {
        if (fetchItem.id === action.payload.id) {
          fetchItem.fetchEmotions.unshift(action.payload.fetchEmotion);
        }
        return null;
      });
      return {
        ...state,
        fetch_item_modal_emotion: action.payload,
      };

    case FETCH_IMAGE:
      return {
        ...state,
        fetch_image: action.payload,
      };

    case FETCH_IMAGE_USER_PROFILE:
      /*console.log("FETCH_IMAGE :" + action.payload.name);*/

      var ilist = state.fetch_image_list.filter(
        (fetch_image) => fetch_image.name === action.payload.name
      );
      if (ilist.length === 0) {
        state.fetch_image_list.push(action.payload);
      }
      return {
        ...state,
        fetch_image: action.payload,
        fetch_image_list: state.fetch_image_list,
      };

    case FETCH_SHOW_LIMIT:
      /*console.log("FETCH_SHOW_LIMIT :");*/
      state.fetch.map((ft, ix) => {
        if (ix < action.payload) {
          /** set usern icon post */
          var ilist = state.fetch_image_list.filter(
            (fetch_image) => fetch_image.name === ft.user.profileImage
          );
          if (ilist.length > 0) {
            ft.user.profileImageFileSource = ilist[0].source;
            ft.user.profileImageIsDownload = true;
          }
          /** set usern icon post */

          ft.fetchComments.map((fc, ix) => {
            if (ix < 3) {
              var ilist = state.fetch_image_list.filter(
                (fetch_image) => fetch_image.name === fc.user.profileImage
              );
              if (ilist.length > 0) {
                fc.user.profileImageFileSource = ilist[0].source;
                fc.user.profileImageIsDownload = true;
              }
            }
            return null;
          });
        }
        return null;
      });
      return {
        ...state,
        fetch_show_limit: action.payload,
      };

    case FETCH_MODAL_SHOW:
      return {
        ...state,
        modal_show: action.payload,
      };
    case FETCH_MODAL_DATA:
      return {
        ...state,
        modal_data: action.payload,
      };
    case FETCH_POST_MODAL_SHOW:
      return {
        ...state,
        post_modal_show: action.payload,
      };
    case FETCH_POST_MODAL_SHOW_IMAGE:
      return {
        ...state,
        post_modal_show_image: action.payload,
      };
    case FETCH_LIST_COMMENTED_SHOW:
      return {
        ...state,
        show_list_comment: action.payload,
      };

    default:
      return state;
  }
}
