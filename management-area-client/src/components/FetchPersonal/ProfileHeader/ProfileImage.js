import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import profileImg from "../../../../src/images/details-1.jpeg";

export class ProfileImage extends Component {
  constructor() {
    super();
    this.state = {
      profileImageFileSource: "",
    };
  }
  componentDidMount() {
    /*console.log("ProfileImage : componentDidMount");*/
    this.setState({
      profileImageFileSource: this.props.profile.profileImageFileSource,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("ProfileImage : UNSAFE_componentWillReceiveProps");*/
    this.setprofileImage(this.props.profile, nextProps.image);
  }
  setprofileImage(profile, image) {
    if (profile !== undefined) {
      if (profile.profileImage === image.name) {
        profile.profileImageFileSource = image.source;
        this.setState({
          profileImageFileSource: profile.profileImageFileSource,
        });
      }
    }
  }

  render() {
    return (
      <img
        src={this.state.profileImageFileSource || profileImg}
        className="rounded-circle custom-edit"
        alt="Cinque Terre"
      />
    );
  }
}

ProfileImage.propTypes = {
  image: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  image: state.profile.image,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage);
