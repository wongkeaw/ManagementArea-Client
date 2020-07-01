import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReadMoreReact from "read-more-react";
import classnames from "classnames";
import {
  postFetchItemComment,
  postFetchItemEmotion,
  setShowListComment,
} from "../../../actions/fetchAction";

import profileImg from "../../../images/details-1.jpeg";
import {
  FaHeart,
  FaHeartbeat,
  FaHeartBroken,
  FaHandMiddleFinger,
  FaCommentSlash,
  FaComments,
} from "react-icons/fa";
import { GoGitCommit } from "react-icons/go";
import { GiCancel } from "react-icons/gi";

export class FetchItemCommentModal extends Component {
  constructor() {
    super();
    this.state = {
      fetchId: -1,
      fetchItemId: -1,
      user: {},
      fetchItemComments: [],
      fetchItemEmotions: [],
      fetchItemEmotions_HeartBroken: [],
      fetchItemEmotions_Heart: [],
      fetchItemEmotions_Heartbeat: [],
      fetchItemEmotions_MiddleFinger: [],
      last_fetchItemComment_id: -1,
      last_fetchItemEmotion_id: -1,
      isShowComment: false,
      showCommentList: 0,
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    /*console.log("FetchItemModal : componentDidMount ");*/
    var showCommentList = 0;
    if (this.props.show_list_comment) {
      showCommentList = 3;
    }
    const {
      fetchId,
      fetchItemId,
      user,
      fetchItemComments,
      fetchItemEmotions,
    } = this.props;
    this.setState({
      fetchId: fetchId,
      fetchItemId: fetchItemId,
      fetchItemComments: fetchItemComments,
      fetchItemEmotions: fetchItemEmotions,
      user: user,
      isShowComment: this.props.show_list_comment,
      showCommentList: showCommentList,
    });
    this.setFetchItemEmotions(fetchItemEmotions);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("FetchItemModal : UNSAFE_componentWillReceiveProps"); */
    var emotion = nextProps.fetch_item_modal_emotion;
    var comment = nextProps.fetch_item_modal_comment;
    var showCommentList = 0;
    if (nextProps.show_list_comment) {
      showCommentList = 3;
    }
    this.setState({
      isShowComment: nextProps.show_list_comment,
      showCommentList: showCommentList,
    });

    if (this.state.fetchItemId === comment.id) {
      this.setState({
        last_fetchItemComment_id: comment.fetchComment.id,
      });
    }
    if (this.state.fetchItemId === emotion.id) {
      this.setState({
        last_fetchItemEmotion_id: emotion.fetchEmotion.id,
      });
    }

    this.setFetchItemCommentImage(
      this.props.fetchItemComments,
      nextProps.fetch_image
    );
    this.setFetchItemEmotions(this.props.fetchItemEmotions);
  }

  setFetchItemCommentImage(fetchComments, fetch_image) {
    /*console.log("FetchItemCommentModal : setFetchItemCommentImage");*/
    fetchComments.map((fetchComment, index) => {
      if (fetchComment.user.profileImage === fetch_image.name) {
        fetchComment.user.profileImageFileSource = fetch_image.source;
        /*console.log("FetchItemCommentModal : OK");*/
        this.setState({
          fetchComments: fetchComments,
        });
      }
      return null;
    });
  }

  setFetchItemEmotions(fetchItemEmotions) {
    let heartBroken = fetchItemEmotions.filter(
      (fetchItemEmotion) => fetchItemEmotion.emotion === 1
    );
    let heart = fetchItemEmotions.filter(
      (fetchItemEmotion) => fetchItemEmotion.emotion === 2
    );
    let heartbeat = fetchItemEmotions.filter(
      (fetchItemEmotion) => fetchItemEmotion.emotion === 3
    );
    let middleFinger = fetchItemEmotions.filter(
      (fetchItemEmotion) => fetchItemEmotion.emotion === 4
    );
    /* heartBroken Heart Heartbeat MiddleFinger */

    this.setState({
      fetchItemEmotions: fetchItemEmotions,
      fetchItemEmotions_HeartBroken: heartBroken,
      fetchItemEmotions_Heart: heart,
      fetchItemEmotions_Heartbeat: heartbeat,
      fetchItemEmotions_MiddleFinger: middleFinger,
    });
  }

  onClickShowComment(param) {
    this.props.setShowListComment(this.state.isShowComment);
  }

  onClickComment(param) {
    /*console.log("onClickComment :"+param);*/
    var isComment = false;
    var commentText = this.state.commentText;
    if ("OpenComment" === param) {
      isComment = true;
    } else if ("CommitComment" === param) {
      isComment = false;

      if (commentText !== undefined && commentText.trim().length > 0) {
        const comment = {
          id: this.state.fetchItemId,
          commentText: commentText.trim(),
        };
        this.props.postFetchItemComment(comment);
      }
      commentText = "";
    } else if ("CancelComment" === param) {
      isComment = false;
    }
    this.setState({
      isComment: isComment,
      commentText: commentText,
    });
  }
  onClickEmotion(emotion) {
    /*console.log("onClickEmotion : " + emotion);*/
    const vEmotion = {
      id: this.state.fetchItemId,
      emotion: emotion,
    };
    this.props.postFetchItemEmotion(vEmotion);
  }

  render() {
    const commentTextFrom = (
      <div className="row ">
        <div className="col-md-12 ">
          <hr />
          <div className="container">
            <div className="row ">
              <div className="col-md-12 ">
                <div className="fetchitem-align">
                  <textarea
                    className={"form-control form-control-lg"}
                    placeholder="Write something."
                    name="commentText"
                    onChange={this.onChange}
                    value={this.state.commentText}
                    rows="2"
                  />
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12 ">
                <div className="fetchitem-align">
                  <GoGitCommit
                    onClick={this.onClickComment.bind(this, "CommitComment")}
                    className="fa fa-edit fetch-fa-comment"
                  />
                  <GiCancel
                    onClick={this.onClickComment.bind(this, "CancelComment")}
                    className="fa fa-edit fetch-fa-edit"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    var commentTextFromX = null;
    if (this.state.isComment) {
      commentTextFromX = commentTextFrom;
    }

    const commentFrom = this.state.fetchItemComments.map((comment, index) => {
      if (index >= this.state.showCommentList) {
        return null;
      } else {
        return (
          <div key={comment.id} className="row ">
            <div className="col-md-12 ">
              <div className="fetchitem-align-left">
                <hr />
                <img
                  src={comment.user.profileImageFileSource || profileImg}
                  className="rounded-circle custom-edit user-icon"
                  alt="Cinque Terre "
                />
                &nbsp;&nbsp;
                <Link to={`/friend/${comment.user.userunique}`}>
                  {comment.user.fullName}
                </Link>
                <ReadMoreReact
                  text={comment.commentText}
                  min={100}
                  ideal={300}
                  max={1000}
                  readMoreText="read more"
                />
              </div>
            </div>
          </div>
        );
      }
    });

    var myPosts = null;
    if (this.state.fetchItemId > -1) {
      myPosts = (
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-md-12">
              <div>
                <img
                  src={this.state.user.profileImageFileSource || profileImg}
                  className="rounded-circle custom-edit user-icon"
                  alt="Cinque Terre "
                />
                &nbsp;&nbsp;
                <Link to={`/friend/${this.state.user.userunique}`}>
                  {this.state.user.fullName}
                </Link>
                <FaCommentSlash
                  onClick={this.onClickShowComment.bind(this, "CommentSlash")}
                  className={classnames(" fetch-fa-edit ", {
                    "fa fa-edit": this.state.isShowComment === true,
                    "fetch-a-edit": this.state.isShowComment === false,
                  })}
                />
                <FaComments
                  onClick={this.onClickComment.bind(this, "OpenComment")}
                  className="fa fa-edit fetch-fa-edit"
                />
                <i className="fetch-a-edit">
                  {this.state.fetchItemComments.length}
                </i>
                <FaHeartBroken
                  onClick={this.onClickEmotion.bind(this, "HeartBroken")}
                  className="fa fa-edit fetch-fa-edit"
                />
                <i className="fetch-a-edit">
                  {this.state.fetchItemEmotions_HeartBroken.length}
                </i>
                <FaHeart
                  onClick={this.onClickEmotion.bind(this, "Heart")}
                  className="fa fa-edit fetch-fa-edit"
                />
                <i className="fetch-a-edit">
                  {this.state.fetchItemEmotions_Heart.length}
                </i>
                <FaHeartbeat
                  onClick={this.onClickEmotion.bind(this, "Heartbeat")}
                  className="fa fa-edit fetch-fa-edit"
                />
                <i className="fetch-a-edit">
                  {this.state.fetchItemEmotions_Heartbeat.length}
                </i>
                <FaHandMiddleFinger
                  onClick={this.onClickEmotion.bind(this, "MiddleFinger")}
                  className="fa fa-edit fetch-fa-edit"
                />
                <i className="fetch-a-edit">
                  {this.state.fetchItemEmotions_MiddleFinger.length}
                </i>
              </div>
            </div>
          </div>
          {commentTextFromX}
          {commentFrom}
        </div>
      );
    }
    return <div>{myPosts}</div>;
  }
}
FetchItemCommentModal.propTypes = {
  fetch_image: PropTypes.object.isRequired,
  fetch_item_modal_emotion: PropTypes.object.isRequired,
  fetch_item_modal_comment: PropTypes.object.isRequired,
  show_list_comment: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  fetch_image: state.fetch.fetch_image,
  fetch_item_modal_emotion: state.fetch.fetch_item_modal_emotion,
  fetch_item_modal_comment: state.fetch.fetch_item_modal_comment,
  show_list_comment: state.fetch.show_list_comment,
});

const mapDispatchToProps = {
  postFetchItemComment,
  postFetchItemEmotion,
  setShowListComment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FetchItemCommentModal);
