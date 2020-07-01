import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  receiveImg,
  showFetchModal,
  receiveImgUserProfile,
} from "../../actions/FetchPersonalActions";
import profileImg from "../../images/details-1.jpeg";
import ReadMoreReact from "read-more-react";
import { Link } from "react-router-dom";

export class FetchItem4 extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      user: {},
      profileImgSource: null,
      source1: null,
      source2: null,
      source3: null,
      source4: null,
      fetchItem_length: 0,
    };
  }
  componentDidMount() {
    /*console.log("FetchItem4 : componentDidMount");*/
    const { data } = this.props;
    var profileImgSource = null;
    var fileSource1 = null;
    var fileSource2 = null;
    var fileSource3 = null;
    var fileSource4 = null;
    if (data.user !== undefined) {
      profileImgSource = data.user.profileImageFileSource;
    }
    if (data.fetchItems.length > 0) {
      fileSource1 = data.fetchItems[0].fileSource;
    }
    if (data.fetchItems.length > 1) {
      fileSource2 = data.fetchItems[1].fileSource;
    }
    if (data.fetchItems.length > 2) {
      fileSource3 = data.fetchItems[2].fileSource;
    }
    if (data.fetchItems.length > 3) {
      fileSource4 = data.fetchItems[3].fileSource;
    }
    this.setState({
      data: data,
      user: data.user,
      profileImgSource: profileImgSource,
      source1: fileSource1,
      source2: fileSource2,
      source3: fileSource3,
      source4: fileSource4,
      fetchItem_length: data.fetchItems.length,
    });
  }
  componentWillUnmount() {
    /*console.log("FetchItem4 : componentWillUnmount");*/
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("FetchItem4 : UNSAFE_componentWillReceiveProps"); */
    this.setFetchImage(this.props.data, nextProps.fetch_image);
  }

  openModal() {
    /*console.log("openModal");*/
    this.props.showFetchModal(true, this.props.data);
  }

  setFetchImage(data, fetch_image) {
    if (data.user !== undefined) {
      if (data.user.profileImage === fetch_image.name) {
        data.user.profileImageFileSource = fetch_image.source;
        this.setState({
          profileImgSource: data.user.profileImageFileSource,
        });
      }
    }
    data.fetchItems.map((fetchItem, index) => {
      if (fetchItem.fileName === fetch_image.name) {
        fetchItem.fileSource = fetch_image.source;
        if (index === 0) {
          this.setState({
            source1: fetchItem.fileSource,
          });
        } else if (index === 1) {
          this.setState({
            source2: fetchItem.fileSource,
          });
        } else if (index === 2) {
          this.setState({
            source3: fetchItem.fileSource,
          });
        } else if (index === 3) {
          this.setState({
            source4: fetchItem.fileSource,
          });
        }
        if (data.user !== undefined) {
          if (data.user.profileImageFileSource === null) {
            this.props.receiveImgUserProfile(
              data.user.profileImage,
              this.props.fetch_image_list
            );
          }
        }
      }
      return null;
    });
  }

  render() {
    const myFrom = (
      <div className="fetchitem-align">
        <hr />
      </div>
    );
    const myFrom1 = (
      <div className="fetchitem-align">
        <hr />
        <img
          onClick={this.openModal.bind(this)}
          src={this.state.source1 || profileImg}
          className="rounded custom-edit fetchitem-max-row"
          alt="Cinque Terre"
        />
        <hr />
      </div>
    );
    const myFrom2 = (
      <div className="fetchitem-align">
        <hr />
        <div className="container">
          <div className="row ">
            <div className="col-md-6 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source1 || profileImg}
                className="rounded custom-edit "
                alt="Cinque Terre"
              />
            </div>
            <div className="col-md-6 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source2 || profileImg}
                className="rounded custom-edit "
                alt="Cinque Terre"
              />
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
    const myFrom3 = (
      <div className="fetchitem-align">
        <hr />
        <div className="container">
          <div className="row ">
            <div className="col-md-4 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source1 || profileImg}
                className="rounded custom-edit "
                alt="Cinque Terre"
              />
            </div>
            <div className="col-md-4 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source2 || profileImg}
                className="rounded custom-edit "
                alt="Cinque Terre"
              />
            </div>
            <div className="col-md-4 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source3 || profileImg}
                className="rounded custom-edit "
                alt="Cinque Terre"
              />
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
    const myFrom4 = (
      <div className="fetchitem-align">
        <hr />
        <div className="container">
          <div className="row ">
            <div className="col-md-6 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source1 || profileImg}
                className="rounded custom-edit "
                alt="Cinque Terre"
              />
            </div>
            <div className="col-md-6 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source2 || profileImg}
                className="rounded custom-edit "
                alt="Cinque Terre"
              />
            </div>
          </div>
          <hr />
          <div className="row ">
            <div className="col-md-6 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source3 || profileImg}
                className="rounded custom-edit "
                alt="Cinque Terre"
              />
            </div>
            <div className="col-md-6 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source4 || profileImg}
                className="rounded custom-edit "
                alt="Cinque Terre"
              />
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
    var myFromShow = myFrom;
    if (this.state.fetchItem_length === 1) {
      myFromShow = myFrom1;
    }
    if (this.state.fetchItem_length === 2) {
      myFromShow = myFrom2;
    }
    if (this.state.fetchItem_length === 3) {
      myFromShow = myFrom3;
    }
    if (this.state.fetchItem_length > 3) {
      myFromShow = myFrom4;
    }
    let describeText = this.state.data.describeText;
    const readMoreReactx = (
      <ReadMoreReact
        text={describeText || ""}
        min={100}
        ideal={300}
        max={1000}
        readMoreText="read more"
      />
    );
    var readMoreReact = <div></div>;
    if (describeText !== undefined) {
      readMoreReact = readMoreReactx;
    }

    return (
      <div className="container">
        <div className="row ">
          <div className="col-md-12 ">
            <div>
              <img
                src={this.state.profileImgSource || profileImg}
                className="rounded-circle custom-edit user-icon"
                alt="Cinque Terre "
              />
              &nbsp;&nbsp;
              <Link to={`/friend/${this.state.user.userunique}`}>
                {this.state.user.fullName}
              </Link>
            </div>
            {myFromShow}
            {readMoreReact}
          </div>
        </div>
      </div>
    );
  }
}

FetchItem4.propTypes = {
  receiveImg: PropTypes.func.isRequired,
  showFetchModal: PropTypes.func.isRequired,
  receiveImgUserProfile: PropTypes.func.isRequired,
  fetch_image: PropTypes.object.isRequired,
  fetch_image_list: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  fetch_image: state.fetchPersonal.fetch_image,
  fetch_image_list: state.fetchPersonal.fetch_image_list,
});

const mapDispatchToProps = {
  receiveImg,
  showFetchModal,
  receiveImgUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchItem4);
