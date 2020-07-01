import React, { Component } from "react";
import { connect } from "react-redux";
import profileImg from "../../../images/details-1.jpeg";

export class ImageModal extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      source: null,
      source2: null,
      source3: null,
      source4: null,
    };
  }
  componentDidMount() {
    /*console.log("ImageModal : componentDidMount");*/
    const { data } = this.props;
    var fileSource = null;
    var fileSource2 = null;
    var fileSource3 = null;
    var fileSource4 = null;

    if (data.length > 0) {
      fileSource = data[0];
    }
    if (data.length > 1) {
      fileSource2 = data[1];
    }
    if (data.length > 2) {
      fileSource3 = data[2];
    }
    if (data.length > 3) {
      fileSource4 = data[3];
    }
    this.setState({
      data: data,
      source: fileSource,
      source2: fileSource2,
      source3: fileSource3,
      source4: fileSource4,
    });
  }
  componentWillUnmount() {}
  UNSAFE_componentWillReceiveProps(nextProps) {
    /* UNSAFE_componentWillReceiveProps(nextProps) */
  }

  openModal() {
    /*console.log("ImageModal : openModal");*/
  }

  render() {
    const myFrom1 = (
      <div className="fetchitem-align">
        <img
          onClick={this.openModal.bind(this)}
          src={this.state.source || profileImg}
          className="rounded custom-edit fetchitem-max-row"
          alt="Cinque Terre"
        />
      </div>
    );
    const myFrom2 = (
      <div className="fetchitem-align">
        <div className="container">
          <div className="row ">
            <div className="col-md-6 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source || profileImg}
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
      </div>
    );
    const myFrom3 = (
      <div className="fetchitem-align">
        <div className="container">
          <div className="row ">
            <div className="col-md-4 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source || profileImg}
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
        </div>
      </div>
    );
    const myFrom4 = (
      <div className="fetchitem-align">
        <div className="container">
          <div className="row ">
            <div className="col-md-3 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source || profileImg}
                className="rounded custom-edit "
                alt="Cinque Terre"
              />
            </div>
            <div className="col-md-3 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source2 || profileImg}
                className="rounded custom-edit "
                alt="Cinque Terre"
              />
            </div>
            <div className="col-md-3 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source3 || profileImg}
                className="rounded custom-edit "
                alt="Cinque Terre"
              />
            </div>
            <div className="col-md-3 ">
              <img
                onClick={this.openModal.bind(this)}
                src={this.state.source4 || profileImg}
                className="rounded custom-edit "
                alt="Cinque Terre"
              />
            </div>
          </div>
        </div>
      </div>
    );
    var myFromShow = myFrom1;
    if (this.state.source2 !== null) {
      myFromShow = myFrom2;
    }
    if (this.state.source3 !== null) {
      myFromShow = myFrom3;
    }
    if (this.state.source4 !== null) {
      myFromShow = myFrom4;
    }
    return (
      <div className="row ">
        <div className="col-md-12 ">
          {myFromShow}
          <hr />
        </div>
      </div>
    );
  }
}
ImageModal.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ImageModal);
