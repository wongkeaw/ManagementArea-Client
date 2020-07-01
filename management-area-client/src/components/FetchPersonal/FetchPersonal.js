import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFetchProfile } from "../../actions/FetchPersonalActions";
import { receiveImgUserProfile } from "../../actions/profileActions";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import ProfileInformation from "./ProfileInformation/ProfileInformation";
import Fetch from "./Fetch";

export class FetchPersonal extends Component {
  constructor() {
    super();
    this.state = {
      userunique: "",
      fetch_user_id: 0,
      fetch_user: {},
    };
  }

  componentDidMount() {
    /*console.log("FetchPersonal : componentDidMount ");*/
    const { userunique } = this.props.match.params;
    this.setState({
      userunique: userunique,
    });
    this.props.getFetchProfile(userunique);
  }
  componentWillUnmount() {
    /*console.log("FetchPersonal : componentWillUnmount ");*/
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("FetchPersonal : UNSAFE_componentWillReceiveProps "); */
    this.setState({
      fetch_user_id: nextProps.fetch_user.id,
      fetch_user: nextProps.fetch_user,
    });
    this.setProfile(nextProps.fetch_user);
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
    }
  }

  render() {
    const profileHeader = (
      <ProfileHeader
        key={"FetchPersonal_ProfileHeader_" + this.state.fetch_user_id}
        profile={this.state.fetch_user}
      />
    );

    const profileInformation = (
      <ProfileInformation
        key={"FetchPersonal_ProfileInformation_" + this.state.fetch_user_id}
        profile={this.state.fetch_user}
      />
    );

    const profileFetch = (
      <Fetch
        key={"FetchPersonal_Fetch_" + this.state.userunique}
        userunique={this.state.userunique}
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
FetchPersonal.propTypes = {
  getFetchProfile: PropTypes.func.isRequired,
  receiveImgUserProfile: PropTypes.func.isRequired,

  fetch_user: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  fetch_user: state.fetchPersonal.fetch_user,
});

const mapDispatchToProps = { getFetchProfile, receiveImgUserProfile };
export default connect(mapStateToProps, mapDispatchToProps)(FetchPersonal);
