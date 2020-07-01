import React, { Component } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  receiveImg,
  showPostFetchModal,
  updateImage,
  uploadMultipleFiles,
  clearImage,
} from "../../actions/fetchAction";
import { FaImage } from "react-icons/fa";
import ImageModal from "./FetchPostModal/ImageModal";
import { default as UUID } from "uuid";

export class FetchPostModal extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      describe: "",
      files: [] /*files is [][]*/,
      filesFull: [] /* it it file for upload */,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.closePostFetchModal();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("FetchPostModal : UNSAFE_componentWillReceiveProps");*/
    let fetchImageModalImage = nextProps.post_modal_show_image;
    if (fetchImageModalImage.length > 0) {
      var matrix = this.listToMatrix(fetchImageModalImage, 4);
      this.setState({
        files: matrix,
      });
    }
  }

  listToMatrix(list, elementsPerSubArray) {
    var matrix = [],
      i,
      k;

    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }

      matrix[k].push("data:;base64," + list[i]);
    }

    return matrix;
  }

  closePostFetchModal() {
    /*console.log("FetchPostModal : closePostFetchModal");*/
    let describeLength = this.state.describe.trim().length;
    this.props.uploadMultipleFiles(this.state.filesFull, this.state.describe);
    if (describeLength > 0) {
      this.setState({
        describe: "",
        files: [],
        filesFull: [],
      });
      this.props.clearImage();
      this.props.showPostFetchModal(false);
    }
  }

  onClick(param) {
    if (param === "FaImage") {
      const fileSelector = document.createElement("input");
      fileSelector.setAttribute("type", "file");
      fileSelector.setAttribute("multiple", "multiple");
      fileSelector.click();
      const fetchPostModal = this;
      fileSelector.addEventListener("change", function (event) {
        fetchPostModal.setState({
          filesFull: event.target.files,
        });
        fetchPostModal.props.updateImage(event.target.files);
      });
    }
  }
  render() {
    const { errors } = this.props;

    var files = null;
    if (this.state.files !== undefined) {
      files = this.state.files.map((row, index) => (
        <ImageModal key={index + UUID.v4()} data={row} />
      ));
    }

    return (
      <ReactModal ariaHideApp={false} isOpen={this.props.post_modal_show}>
        <div className="container">
          <div className="card card-body bg-light mb-3">{files}</div>
          <div className="card card-body bg-light mb-3">
            <form onSubmit={this.onSubmit}>
              <div className="row ">
                <div className="col-md-12 ">
                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.describe,
                      })}
                      placeholder="Write something."
                      name="describe"
                      value={this.state.describe}
                      onChange={this.onChange}
                      rows="5"
                    />
                    {errors.describe && (
                      <div className="invalid-feedback">{errors.describe}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-12 ">
                  <FaImage
                    onClick={this.onClick.bind(this, "FaImage")}
                    className="fa fa-edit fetchPostModal-fa-edit"
                  />
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </ReactModal>
    );
  }
}

FetchPostModal.propTypes = {
  receiveImg: PropTypes.func.isRequired,
  showPostFetchModal: PropTypes.func.isRequired,
  updateImage: PropTypes.func.isRequired,
  uploadMultipleFiles: PropTypes.func.isRequired,
  clearImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post_modal_show: state.fetchPersonal.post_modal_show,
  post_modal_show_image: state.fetchPersonal.post_modal_show_image,
  errors: state.fetchPersonal.post_modal_error,
});

const mapDispatchToProps = {
  receiveImg,
  showPostFetchModal,
  updateImage,
  uploadMultipleFiles,
  clearImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(FetchPostModal);
