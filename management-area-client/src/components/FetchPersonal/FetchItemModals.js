import React, { Component } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { receiveImg, showFetchModal } from "../../actions/FetchPersonalActions";

import FetchItemModal from "./FetchItemModal/FetchItemModal";

export class FetchItemModals extends Component {
  constructor() {
    super();

    this.state = {
      reFresh: 0,
      fetchItem: {},
      fetchId: 0,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("FetchItemModals : UNSAFE_componentWillReceiveProps");*/
    var v_modal_data = nextProps.modal_data;
    if (v_modal_data != null && v_modal_data.fetchItems !== undefined) {
      v_modal_data.fetchItems.map((fetchItem, i) => {
        if (fetchItem.download === false && fetchItem.fileSource === null) {
          fetchItem.download = true;
          this.props.receiveImg(fetchItem.fileName);
        }
        return null;
      });
      this.setState({
        fetchItem: v_modal_data,
        fetchId: v_modal_data.id,
      });
    } else {
      this.setState({
        fetchItem: {},
      });
    }
  }

  reFreshFetchModal() {
    /*console.log("reFresh FetchItemModals");*/
    this.setState({
      reFresh: this.state.reFresh + 1,
    });
  }

  render() {
    var myPosts = null;
    if (this.state.fetchItem.fetchItems !== undefined) {
      myPosts = this.state.fetchItem.fetchItems.map((fetchItem) => (
        <FetchItemModal
          key={
            "FetchItemModal_fetchId" +
            this.state.fetchItem.id +
            "fetchItemId" +
            fetchItem.id
          }
          fetchId={this.state.fetchItem.id}
          fetchItem={fetchItem}
          user={this.state.fetchItem.user}
        />
      ));
    }
    return (
      <ReactModal ariaHideApp={false} isOpen={this.props.modal_show}>
        <div className=" ">{myPosts}</div>
      </ReactModal>
    );
  }
}

FetchItemModals.propTypes = {
  receiveImg: PropTypes.func.isRequired,
  showFetchModal: PropTypes.func.isRequired,
  fetch_image: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  fetch_image: state.fetchPersonal.fetch_image,
  modal_show: state.fetchPersonal.modal_show,
  modal_data: state.fetchPersonal.modal_data,
});

const mapDispatchToProps = { receiveImg, showFetchModal };

export default connect(mapStateToProps, mapDispatchToProps)(FetchItemModals);
