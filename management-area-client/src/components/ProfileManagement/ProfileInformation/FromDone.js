import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateMode } from "../../../actions/profileActions";
import { FaEdit } from "react-icons/fa";

class FromDone extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      username: "",
      fullName: "",
    };
  }
  componentDidMount() {
    /*console.log("FromDone : componentDidMount");*/
    this.setFromDoneState(this.props.profile);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("FromDone : UNSAFE_componentWillReceiveProps");*/
    if (nextProps.profile) {
      this.setFromDoneState(nextProps.profile);
    }
  }
  setFromDoneState(profile) {
    /*console.log("FromDone : setFromDoneState");*/
    /*console.log(profile);*/
    const { id, username, fullName, status } = profile;
    this.setState({
      id,
      username,
      fullName,
      status,
    });
  }

  onClick(param) {
    this.props.updateMode(true);
  }

  render() {
    return (
      <div className="card card-body bg-light mb-3">
        <p className="lead text-left">My Profile : {this.state.fullName}</p>
        <p className="lead text-left">Name : {this.state.username} </p>
        <p className="lead text-left">Email Address : {this.state.username}</p>
        <span onClick={() => this.onClick("FromDone")}>
          <FaEdit className="fa fa-edit absolute" />
        </span>
      </div>
    );
  }
}

FromDone.propTypes = {
  updateMode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, {
  updateMode,
})(FromDone);
