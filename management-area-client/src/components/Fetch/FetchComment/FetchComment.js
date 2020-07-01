import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ReadMoreReact from "read-more-react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import { GoGitCommit } from "react-icons/go";
import { GiCancel } from "react-icons/gi";
import {
  FaHeart,
  FaHeartbeat,
  FaHeartBroken,
  FaHandMiddleFinger,
  FaCommentSlash,
  FaComments,
} from "react-icons/fa";
import profileImg from "../../../images/details-1.jpeg";
import {
  postComment,
  postEmotion,
  setShowListComment,
} from "../../../actions/fetchAction";

export class FetchComment extends Component {
  constructor() {
    super();
    this.state = {
      isComment: false,
      fetchId: -1,
      commentText: "",
      fetchComments: [],
      fetchEmotions: [],
      fetchEmotions_HeartBroken: [],
      fetchEmotions_Heart: [],
      fetchEmotions_Heartbeat: [],
      fetchEmotions_MiddleFinger: [],
      last_fetchComment_id: -1,
      last_fetchEmotion_id: -1,
      isShowComment: false,
      showCommentList: 0,
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    /*console.log("FetchComment : componentDidMount");*/
    const { fetchId, fetchComments, fetchEmotions } = this.props;
    var showCommentList = 0;
    if (this.props.show_list_comment) {
      showCommentList = 3;
    }

    this.setFetchfetchEmotions(fetchEmotions);
    this.setState({
      fetchId: fetchId,
      fetchComments: fetchComments,
      isShowComment: this.props.show_list_comment,
      showCommentList: showCommentList,
    });
  }

  componentWillUnmount() {
    /*console.log("FetchComment : componentWillUnmount");*/
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("FetchComment : UNSAFE_componentWillReceiveProps");*/
    var showCommentList = 0;
    if (nextProps.show_list_comment) {
      showCommentList = 3;
    }
    this.setState({
      isShowComment: nextProps.show_list_comment,
      showCommentList: showCommentList,
    });
    if (this.state.fetchId === nextProps.fetch_modal_comment.fetchId) {
      this.setState({
        last_fetchComment_id: nextProps.fetch_modal_comment.fetchComment.id,
      });
    }
    if (this.state.fetchId === nextProps.fetch_modal_emotion.id) {
      this.setState({
        last_fetchEmotion_id: nextProps.fetch_modal_emotion.fetchEmotion.id,
      });
    }

    this.setFetchCommentImage(this.props.fetchComments, nextProps.fetch_image);
    this.setFetchfetchEmotions(this.props.fetchEmotions);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  setFetchCommentImage(fetchComments, fetch_image) {
    /*console.log("FetchComment : setFetchCommentImage");*/
    fetchComments.map((fetchComment, index) => {
      if (fetchComment.user.profileImage === fetch_image.name) {
        fetchComment.user.profileImageFileSource = fetch_image.source;
        /*console.log("FetchComment : OK");*/
        this.setState({
          fetchComments: fetchComments,
        });
      }
      return null;
    });
  }
  setFetchfetchEmotions(fetchEmotions) {
    let heartBroken = fetchEmotions.filter(
      (fetchEmotion) => fetchEmotion.emotion === 1
    );
    let heart = fetchEmotions.filter(
      (fetchEmotion) => fetchEmotion.emotion === 2
    );
    let heartbeat = fetchEmotions.filter(
      (fetchEmotion) => fetchEmotion.emotion === 3
    );
    let middleFinger = fetchEmotions.filter(
      (fetchEmotion) => fetchEmotion.emotion === 4
    );
    /* heartBroken Heart Heartbeat MiddleFinger */

    this.setState({
      fetchEmotions: fetchEmotions,
      fetchEmotions_HeartBroken: heartBroken,
      fetchEmotions_Heart: heart,
      fetchEmotions_Heartbeat: heartbeat,
      fetchEmotions_MiddleFinger: middleFinger,
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

      if (commentText.trim().length > 0) {
        const comment = {
          id: this.state.fetchId,
          commentText: commentText.trim(),
        };
        this.props.postComment(comment);
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
      id: this.state.fetchId,
      emotion: emotion,
    };
    this.props.postEmotion(vEmotion);
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

    const commentFrom = this.state.fetchComments.map((comment, index) => {
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

    return (
      <div className="container">
        <div>
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
          <i className="fetch-a-edit">{this.state.fetchComments.length}</i>
          <FaHeartBroken
            onClick={this.onClickEmotion.bind(this, "HeartBroken")}
            className="fa fa-edit fetch-fa-edit"
          />
          <i className="fetch-a-edit">
            {this.state.fetchEmotions_HeartBroken.length}
          </i>
          <FaHeart
            onClick={this.onClickEmotion.bind(this, "Heart")}
            className="fa fa-edit fetch-fa-edit"
          />
          <i className="fetch-a-edit">
            {this.state.fetchEmotions_Heart.length}
          </i>
          <FaHeartbeat
            onClick={this.onClickEmotion.bind(this, "Heartbeat")}
            className="fa fa-edit fetch-fa-edit"
          />
          <i className="fetch-a-edit">
            {this.state.fetchEmotions_Heartbeat.length}
          </i>
          <FaHandMiddleFinger
            onClick={this.onClickEmotion.bind(this, "MiddleFinger")}
            className="fa fa-edit fetch-fa-edit"
          />
          <i className="fetch-a-edit">
            {this.state.fetchEmotions_MiddleFinger.length}
          </i>
        </div>
        {commentTextFromX}
        {commentFrom}
      </div>
    );
  }
}
FetchComment.propTypes = {
  postComment: PropTypes.func.isRequired,
  postEmotion: PropTypes.func.isRequired,
  fetch_modal_comment: PropTypes.object.isRequired,
  fetch_modal_emotion: PropTypes.object.isRequired,
  fetch_image: PropTypes.object.isRequired,
  show_list_comment: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  fetch_modal_comment: state.fetch.fetch_modal_comment,
  fetch_modal_emotion: state.fetch.fetch_modal_emotion,
  fetch_image: state.fetch.fetch_image,
  show_list_comment: state.fetch.show_list_comment,
});

const mapDispatchToProps = {
  postComment,
  postEmotion,
  setShowListComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchComment);
