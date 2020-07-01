import React, { Component } from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { receiveImg, showFetchModal } from "../../actions/fetchAction";
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
    /*console.log(nextProps.modal_data);*/
    var v_modal_data = nextProps.modal_data;
    if (v_modal_data != null && v_modal_data.fetchItems !== undefined) {
      v_modal_data.fetchItems.map((fetchItem, i) => {
        if (fetchItem.download === false && fetchItem.fileSource === null) {
          fetchItem.download = true;
          this.props.receiveImg(fetchItem.fileName);
        }
        return null;
      });
      /*console.log(v_modal_data); */
      /*console.log(v_modal_data.fetchItems); */
      this.setState({
        fetchItem: v_modal_data,
        fetchId: v_modal_data.id,
      });
    } else {
      this.setState({
        fetchItem: {},
      });
    }
    /*console.log("this.state.data :");*/
    /*console.log(this.state.data);*/
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
  fetch_image: state.fetch.fetch_image,
  modal_show: state.fetch.modal_show,
  modal_data: state.fetch.modal_data,
});

const mapDispatchToProps = { receiveImg, showFetchModal };

export default connect(mapStateToProps, mapDispatchToProps)(FetchItemModals);
