import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateImage, uploadFiles } from "../../../actions/profileActions";
import profileImg from "../../../../src/images/details-1.jpeg";

export class ProfileImage extends Component {
  constructor() {
    super();
    this.state = {
      profileImageFileSource: "",
    };
    this.onClick = this.onClick.bind(this);
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
  onClick(e) {
    /*console.log("ProfileImage : onClick");*/
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.click();
    const userprofile = this;
    fileSelector.addEventListener("change", function (event) {
      const v_file = event.target.files[0];
      userprofile.props.updateImage(
        v_file,
        userprofile.props.profile.profileImage
      );
      userprofile.props.uploadFiles(v_file, "profileImage");
    });
  }
  render() {
    return (
      <img
        onClick={this.onClick}
        src={this.state.profileImageFileSource || profileImg}
        className="rounded-circle custom-edit"
        alt="Cinque Terre"
      />
    );
  }
}

ProfileImage.propTypes = {
  image: PropTypes.object.isRequired,
  updateImage: PropTypes.func.isRequired,
  uploadFiles: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  image: state.profile.image,
});

const mapDispatchToProps = { updateImage, uploadFiles };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage);
