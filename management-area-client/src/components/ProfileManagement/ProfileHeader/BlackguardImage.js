import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileImage from "./ProfileImage";
import { updateImage, uploadFiles } from "../../../actions/profileActions";

import defaultBcgImg from "../../../../src/images/defaultBcg.jpeg";
import { FaImage } from "react-icons/fa";

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
  onClick(param) {
    /*console.log("BlackguardImage : onClick");*/
    if (param === "FaImage") {
      const fileSelector = document.createElement("input");
      fileSelector.setAttribute("type", "file");
      fileSelector.click();
      const userprofile = this;
      fileSelector.addEventListener("change", function (event) {
        const v_file = event.target.files[0];
        userprofile.props.updateImage(
          v_file,
          userprofile.props.profile.blackguardImage
        );
        userprofile.props.uploadFiles(v_file, "blackguardImage");
      });
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
        <FaImage
          onClick={this.onClick.bind(this, "FaImage")}
          className="fa fa-edit absolute"
        />
      </div>
    );
  }
}

BlackguardImage.propTypes = {
  image: PropTypes.object.isRequired,
  updateImage: PropTypes.func.isRequired,
  uploadFiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  image: state.profile.image,
});

const mapDispatchToProps = { updateImage, uploadFiles };

export default connect(mapStateToProps, mapDispatchToProps)(BlackguardImage);
