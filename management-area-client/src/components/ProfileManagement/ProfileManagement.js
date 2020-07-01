import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getProfile,
  receiveImgUserProfile,
} from "../../actions/profileActions";
import { getFetchProfile } from "../../actions/FetchPersonalActions";
import ProfileInformation from "./ProfileInformation/ProfileInformation";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import Fetch from "./../FetchPersonal/Fetch";
export class ProfileManagement extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
    };
  }
  componentDidMount() {
    /*console.log("ProfileManagement : componentDidMount");*/
    if (this.props.security.validToken) {
      if (this.props.profile.fullName === undefined) {
        const { user } = this.props.security;
        if (this.props.profile.fullName === undefined) {
          this.props.getProfile(user.id, this.props.history);
        }
      } else {
        this.setProfile(this.props.profile);
      }
    } else {
      this.props.history.push("/profile");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("ProfileManagement : UNSAFE_componentWillReceiveProps");*/
    if (nextProps.profile) {
      this.setState(
        {
          profile: nextProps.profile,
        },
        this.setProfile(nextProps.profile)
      );
    }
  }

  setProfile(profile) {
    if (profile !== undefined) {
      var profileImage = [];
      if (
        profile.profileImageIsDownload === false &&
        profile.profileImageFileSource === null
      ) {
        profileImage.push(profile.profileImage);
      }
      if (
        profile.blackguardImageIsDownload === false &&
        profile.blackguardImageFileSource === null
      ) {
        profileImage.push(profile.blackguardImage);
      }

      profileImage.map((image, index) => {
        /*console.log("image :" + index); */
        this.props.receiveImgUserProfile(image);
        return null;
      });

      this.props.getFetchProfile(profile.userunique);
    }
  }

  render() {
    const profileHeader = (
      <ProfileHeader
        key={"ProfileHeader_" + this.props.profile.id}
        profile={this.props.profile}
      />
    );

    const profileInformation = (
      <ProfileInformation
        key={"ProfileInformation_" + this.props.profile.id}
        profile={this.props.profile}
      />
    );

    const profileFetch = (
      <Fetch
        key={"Fetch_" + this.props.profile.userunique}
        userunique={this.props.profile.userunique}
      />
    );

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 m-auto">{profileHeader}</div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12 m-auto">{profileInformation}</div>
          </div>
        </div>
        {profileFetch}
      </div>
    );
  }
}
ProfileManagement.propTypes = {
  getProfile: PropTypes.func.isRequired,
  receiveImgUserProfile: PropTypes.func.isRequired,
  getFetchProfile: PropTypes.func.isRequired,

  security: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  security: state.security,
  profile: state.profile.profile,
});

const mapDispatchToProps = {
  getProfile,
  receiveImgUserProfile,
  getFetchProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileManagement);
