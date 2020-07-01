import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { updateProfile, updateMode } from "../../../actions/profileActions";

class FromEditing extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    /*console.log("FromEditing : componentDidMount");*/
    this.setFromEditingState(this.props.profile);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    /*console.log("FromEditing : UNSAFE_componentWillReceiveProps");*/
    if (nextProps.profile) {
      this.setFromEditingState(nextProps.profile);
    }
  }

  setFromEditingState(profile) {
    /*console.log("FromEditing : setFromEditingState");*/
    /*console.log(profile);*/
    const { id, username, fullName, status } = profile;
    this.setState({
      id,
      username,
      fullName,
      status,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newProfile = {
      id: this.state.id,
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };

    this.props.updateProfile(newProfile);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick(param) {
    this.props.updateMode(false);
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.fullName,
              })}
              placeholder="Full Name"
              name="fullName"
              value={this.state.fullName}
              onChange={this.onChange}
            />
            {errors.fullName && (
              <div className="invalid-feedback">{errors.fullName}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.username,
              })}
              placeholder="Email Address (Username)"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="Password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password,
              })}
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.confirmPassword,
              })}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.onChange}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>
          <input type="submit" className="btn btn-info btn-block mt-4" />
          <input
            type="button"
            value="Cancel"
            onClick={() => this.onClick("FromEditing")}
            className="btn btn-info btn-block mt-4"
          />
        </form>
      </div>
    );
  }
}

FromEditing.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  updateMode: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.profile.errors,
});
export default connect(mapStateToProps, {
  updateProfile,
  updateMode,
})(FromEditing);
