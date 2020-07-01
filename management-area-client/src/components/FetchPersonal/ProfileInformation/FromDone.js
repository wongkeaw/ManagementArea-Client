import React, { Component } from "react";
import { connect } from "react-redux";

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

  render() {
    return (
      <div className="card card-body bg-light mb-3">
        <p className="lead text-left">My Profile : {this.state.fullName}</p>
        <p className="lead text-left">Name : {this.state.username} </p>
        <p className="lead text-left">Email Address : {this.state.username}</p>
      </div>
    );
  }
}

FromDone.propTypes = {};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FromDone);
