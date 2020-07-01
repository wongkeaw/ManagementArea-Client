import React, { Component } from "react";
import PropTypes from "prop-types";
import FetchItemCommentModal from "./FetchItemCommentModal";

import { connect } from "react-redux";

import profileImg from "../../../images/details-1.jpeg";

export class FetchItemModal extends Component {
  constructor() {
    super();
    this.state = {
      fetchId: 0,
      user: {},
      fetchItem: {}
    };
  }
  componentDidMount() {
    /*console.log("FetchItemModal : componentDidMount ");*/
    const { fetchId, fetchItem, user } = this.props;
    this.setState({
      fetchId: fetchId,
      user: user,
      fetchItem: fetchItem
    });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("FetchItemModal : UNSAFE_componentWillReceiveProps"); */
    /*
    if (this.state.fetchItem.fileName === nextProps.fetch_image.name) {
    }
    */
  }

  render() {
    var myPosts = null;

    if (
      this.state.fetchItem !== undefined &&
      this.state.fetchItem.id !== undefined
    ) {
      myPosts = (
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-md-12 ">
              <div className=" fetchItemModals-align">
                <img
                  src={this.state.fetchItem.fileSource || profileImg}
                  className="rounded custom-edit fetchItemModals-max-row"
                  alt="Cinque Terre"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-1 " />
            <div className="col-md-10 ">
              <FetchItemCommentModal
                key={
                  "FetchItemCommentModal_fetchId" +
                  this.state.fetchId +
                  "fetchItemId" +
                  this.state.fetchItem.id
                }
                fetchId={this.state.fetchId}
                fetchItemId={this.state.fetchItem.id}
                fetchItemComments={this.state.fetchItem.fetchComments}
                fetchItemEmotions={this.state.fetchItem.fetchEmotions}
                user={this.state.user}
              />
            </div>
            <div className="col-md-1 " />
          </div>
        </div>
      );
    }
    return <div>{myPosts}</div>;
  }
}
FetchItemModal.propTypes = {
  fetch_image: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  fetch_image: state.fetch.fetch_image
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FetchItemModal);
