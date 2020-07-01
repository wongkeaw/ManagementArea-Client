import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { receiveImg, showFetchModal } from "../../actions/fetchAction";
import profileImg from "../../images/details-1.jpeg";

export class FetchItem extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      source: null,
    };
  }
  componentDidMount() {
    /*console.log("FetchItem : componentDidMount");*/
    const { data } = this.props;
    var fileSource = null;
    if (data.imageInfos.length > 0) {
      fileSource = data.imageInfos[0].fileSource;
    }
    this.setState({
      data: data,
      source: fileSource,
    });
  }
  componentWillUnmount() {
    /*console.log("FetchItem : componentWillUnmount");*/
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("FetchItem : UNSAFE_componentWillReceiveProps"); */
    this.setFetchImage(this.props.data, nextProps.fetch_image);
  }

  openModal() {
    /*console.log("openModal");*/
    this.props.showFetchModal(true, this.props.data);
  }

  setFetchImage(data, fetch_image) {
    data.imageInfos.map((imageInfos, i) => {
      if (imageInfos.fileName === fetch_image.name) {
        imageInfos.fileSource = "data:;base64," + fetch_image.source;
        this.setState({
          source: imageInfos.fileSource,
        });
      }
      return null;
    });
  }

  render() {
    return (
      <div className="card card-body bg-light mb-3">
        <div className="container">
          <div className="row ">
            <div className="col-md-12 ">
              <div className="fetchitem-align">
                <img
                  onClick={this.openModal.bind(this)}
                  src={this.state.source || profileImg}
                  className="rounded custom-edit fetchitem-max-row"
                  alt="Cinque Terre"
                />
              </div>
              <hr />
              <div>{this.state.data.hashtag}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FetchItem.propTypes = {
  receiveImg: PropTypes.func.isRequired,
  showFetchModal: PropTypes.func.isRequired,
  fetch_image: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  fetch_image: state.fetch.fetch_image,
});

const mapDispatchToProps = { receiveImg, showFetchModal };

export default connect(mapStateToProps, mapDispatchToProps)(FetchItem);
