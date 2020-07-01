import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileImage from "./ProfileImage";

import defaultBcgImg from "../../../../src/images/defaultBcg.jpeg";

export class BlackguardImage extends Component {
  constructor() {
    super();
    this.state = {
      blackguardImageSource: "",
    };
  }
  componentDidMount() {
    /*console.log("BlackguardImage : componentDidMount");*/
    this.setState({
      blackguardImageSource: this.props.profile.blackguardImageFileSource,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("BlackguardImage : UNSAFE_componentWillReceiveProps");*/
    this.setBlackguardImage(this.props.profile, nextProps.image);
  }

  setBlackguardImage(profile, image) {
    if (profile !== undefined) {
      if (profile.blackguardImage === image.name) {
        profile.blackguardImageFileSource = image.source;
        this.setState({
          blackguardImageSource: profile.blackguardImageFileSource,
        });
      }
    }
  }

  render() {
    return (
      <div
        className="rounded background-image"
        style={{
          backgroundImage: `url(${
            this.state.blackguardImageSource || defaultBcgImg
          })`,
        }}
      >
        <div className="row">
          <div className="col-md-4 m-auto">
            <ProfileImage
              key={"ProfileImage_" + this.props.profile.id}
              profile={this.props.profile}
            />
          </div>
          <div className="col-md-8 m-auto"></div>
        </div>
      </div>
    );
  }
}

BlackguardImage.propTypes = {
  image: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  image: state.profile.image,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BlackguardImage);
