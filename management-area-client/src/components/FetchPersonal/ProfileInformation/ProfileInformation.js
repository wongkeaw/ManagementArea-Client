import React, { Component } from "react";

import FromDone from "./FromDone";
import { connect } from "react-redux";

export class ProfileInformation extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    /*console.log("ProfileInformation : componentDidMount");*/
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("ProfileInformation : UNSAFE_componentWillReceiveProps");*/
    /*console.log(nextProps.mode_edit);*/
    this.setState({
      mode: nextProps.mode_edit,
    });
  }
  render() {
    const fromDone = (
      <FromDone
        key={"ProfileInformation_FromDone_" + this.props.profile.id}
        profile={this.props.profile}
      />
    );
    return <div>{fromDone}</div>;
  }
}
ProfileInformation.propTypes = {};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInformation);
