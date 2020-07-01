import React, { Component } from "react";

import FromDone from "./FromDone";
import FromEditing from "./FromEditing";
import { connect } from "react-redux";

export class ProfileInformation extends Component {
  constructor() {
    super();
    this.state = {
      mode: false,
    };
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
        key={"FromDone_" + this.props.profile.id}
        profile={this.props.profile}
      />
    );
    const fromEditing = (
      <FromEditing
        key={"FromEditing_" + this.props.profile.id}
        profile={this.props.profile}
      />
    );

    var vFrom;
    if (this.state.mode === false || this.state.mode === undefined) {
      vFrom = fromDone;
    } else {
      vFrom = fromEditing;
    }
    return <div>{vFrom}</div>;
  }
}
ProfileInformation.propTypes = {};
const mapStateToProps = (state) => ({
  mode_edit: state.profile.mode_edit,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInformation);
