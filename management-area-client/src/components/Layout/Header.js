import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";
import { getProfile } from "../../actions/profileActions";
import { showPostFetchModal } from "../../actions/fetchAction";
import { IoMdShare } from "react-icons/io";

class Header extends Component {
  logout() {
    const { user } = this.props.security;
    this.props.logout(user, this.props.history);
    //window.location.href = "/";
  }

  crateFetch() {
    this.props.showPostFetchModal(true);
    //window.location.href = "/";
  }
  componentDidMount() {
    if (this.props.security.validToken) {
      if (this.props.profile.fullName === undefined) {
        const { user } = this.props.security;
        this.props.getProfile(user.id, this.props.history);
      }
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("Header : UNSAFE_componentWillReceiveProps ");*/
    if (this.props.profile.fullName === undefined) {
      const { user } = this.props.security;
      if (user.id !== undefined) {
        if (this.props.profile.fullName === undefined) {
          this.props.getProfile(user.id, this.props.history);
        }
      }
    }
  }

  render() {
    const { validToken, user } = this.props.security;

    const userIsAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"></li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/fetch"
              onClick={this.crateFetch.bind(this)}
            >
              <IoMdShare className=" absolute" />
              <i className="fas fa-user-circle mr-1" />
              post
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              <i className="fas fa-user-circle mr-1" />
              {this.props.profile.fullName}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/logout"
              onClick={this.logout.bind(this)}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );

    const userIsNotAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    );

    let headerLinks;

    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4 sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/fetch">
            Track you! trip
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {headerLinks}
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  showPostFetchModal: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, {
  getProfile,
  logout,
  showPostFetchModal,
})(Header);
