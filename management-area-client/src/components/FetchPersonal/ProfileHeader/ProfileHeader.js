import React, { Component } from "react";
import { connect } from "react-redux";
import BlackguardImage from "./BlackguardImage";

export class ProfileHeader extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    /*console.log("BlackguardImage : componentDidMount");*/
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("BlackguardImage : UNSAFE_componentWillReceiveProps");*/
  }
  render() {
    return (
      <BlackguardImage
        key={"BlackguardImage_" + this.props.profile.id}
        profile={this.props.profile}
      />
    );
  }
}

ProfileHeader.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
