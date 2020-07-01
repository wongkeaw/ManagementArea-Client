import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FetchItem4 from "./FetchItem4";
import FetchComment from "./FetchComment/FetchComment";
import FetchPostModal from "./FetchPostModal";
import FetchItemModals from "./FetchItemModals";
import {
  getFetchByUser,
  updateLimit,
  showFetchModal,
  showPostFetchModal,
  receiveImgUserProfile,
  receiveImg,
} from "../../actions/FetchPersonalActions";

export class Fetch extends Component {
  constructor() {
    super();
    this.state = {
      userunique: null,
      fetchs: [],
      fetch_length: 0,
    };
  }

  componentDidMount() {
    this.handleOnScroll();
    /*console.log("Fetch : componentDidMount ");*/
    window.addEventListener("scroll", this.handleOnScroll);
    if (this.props.fetch.length === 0) {
      if (this.state.userunique !== null) {
        this.props.getFetchByUser(this.state.userunique);
      }
    } else {
      this.setFetch(
        this.props.userunique,
        this.props.fetch,
        this.props.fetch_show_limit,
        this.props.fetch_length,
        this.props.fetch_image_list
      );
    }
  }
  componentWillUnmount() {
    /*console.log("Fetch : componentWillUnmount ");*/
    window.removeEventListener("scroll", this.handleOnScroll);
    this.props.updateLimit(3);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("Fetch : UNSAFE_componentWillReceiveProps ");*/
    if (nextProps.fetch_user.loadFetch === false) {
      nextProps.fetch_user.loadFetch = true;
      this.props.getFetchByUser(nextProps.fetch_user.userunique);
    }

    this.setFetch(
      nextProps.fetch_user.userunique,
      nextProps.fetch,
      nextProps.fetch_show_limit,
      nextProps.fetch_length,
      nextProps.fetch_image_list
    );
  }

  handleOnScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const scrolled = winScroll / height;
    if (scrolled > 0.99999 || (winScroll === 0 && height === 0)) {
      /*console.log("Load data .. : " + scrolled);*/
      console.log("fetch_show_limit : lmit: " + this.props.fetch_show_limit);
      this.props.updateLimit(
        this.props.userunique,
        this.props.fetch_show_limit,
        this.props.fetch_page
      );
    }
    this.props.showFetchModal(false, null);
    this.closePostFetchModal();
  };

  closePostFetchModal() {
    this.props.showPostFetchModal(false);
  }

  setFetch(
    userunique,
    fetch,
    fetch_show_limit,
    fetch_length,
    fetch_image_list
  ) {
    if (userunique === undefined) return;
    if (fetch === undefined) return;
    var vFetchs = fetch;
    var userImages = [];
    var postImages = [];
    vFetchs.map((ft, index) => {
      /* begin load user profile */
      if (ft.user !== undefined) {
        if (
          ft.user.profileImageIsDownload === false &&
          ft.user.profileImageFileSource === null &&
          index < fetch_show_limit
        ) {
          ft.user.profileImageIsDownload = true;
          if (userImages.indexOf(ft.user.profileImage) === -1) {
            userImages.push(ft.user.profileImage);
          }
        }
      }

      if (ft.fetchComments !== undefined) {
        ft.fetchComments.map((fetchComment) => {
          if (fetchComment.user !== undefined) {
            if (
              fetchComment.user.profileImageIsDownload === false &&
              fetchComment.user.profileImageFileSource === null &&
              index < fetch_show_limit
            ) {
              fetchComment.user.profileImageIsDownload = true;
              if (userImages.indexOf(fetchComment.user.profileImage) === -1) {
                userImages.push(fetchComment.user.profileImage);
              }
            }
          }
          return null;
        });
      }
      /* end load user profile */

      ft.fetchItems.map((fetchItem, indexSub) => {
        if (
          fetchItem.download === false &&
          fetchItem.fileSource === null &&
          indexSub < 4 &&
          index < fetch_show_limit
        ) {
          fetchItem.download = true;
          if (postImages.indexOf(fetchItem.fileName) === -1) {
            postImages.push(fetchItem.fileName);
          }
        }
        return null;
      });
      return null;
    });

    userImages.map((image, index) => {
      this.props.receiveImgUserProfile(image, fetch_image_list);
      return null;
    });

    postImages.map((image, index) => {
      this.props.receiveImg(image);
      return null;
    });

    /*console.log("setState : fetchs : fetch_show_limit :" + fetch_show_limit);*/
    this.setState({
      userunique: userunique,
      fetch_length: fetch_length,
      fetchs: vFetchs.filter((ft, index) => {
        if (index < fetch_show_limit) return ft;
        return null;
      }),
    });
  }

  render() {
    const myFetch = this.state.fetchs.map((data, index) => (
      <div key={"Fetch" + data.id + "index" + index} className="row">
        <div className="col-md-12 ">
          <div className="card card-body bg-light mb-3">
            <FetchItem4 data={data} />
            <FetchComment
              fetchComments={data.fetchComments}
              fetchEmotions={data.fetchEmotions}
              fetchId={data.id}
            />
          </div>
        </div>
      </div>
    ));
    return (
      <div className="container">
        <div className="row">
          <FetchItemModals />
        </div>
        <div className="row">
          <FetchPostModal />
        </div>
        {myFetch}
      </div>
    );
  }
}
Fetch.propTypes = {
  getFetchByUser: PropTypes.func.isRequired,
  receiveImg: PropTypes.func.isRequired,
  receiveImgUserProfile: PropTypes.func.isRequired,
  updateLimit: PropTypes.func.isRequired,
  showFetchModal: PropTypes.func.isRequired,
  showPostFetchModal: PropTypes.func.isRequired,

  fetch: PropTypes.array.isRequired,
  fetch_image_list: PropTypes.array.isRequired,
  fetch_show_limit: PropTypes.number.isRequired,
  fetch_page: PropTypes.object.isRequired,
  fetch_length: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  fetch_user: state.fetchPersonal.fetch_user,
  fetch: state.fetchPersonal.fetch,
  fetch_image_list: state.fetchPersonal.fetch_image_list,
  fetch_show_limit: state.fetchPersonal.fetch_show_limit,
  fetch_page: state.fetchPersonal.fetch_page,
  fetch_length: state.fetchPersonal.fetch_length,
});

const mapDispatchToProps = {
  getFetchByUser,
  receiveImg,
  receiveImgUserProfile,
  updateLimit,
  showFetchModal,
  showPostFetchModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Fetch);
