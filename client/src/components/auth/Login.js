import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { loginUser } from "../../actions/authActions";

const Login = props => {
  const error = props.formError;
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 m-auth">
          <h1 className="display-4 text-center">Login</h1>
          <form
            onSubmit={props.handleSubmit(formValues => {
              props.loginUser(formValues, props.history);
            })}
          >
            <div className="form-group">
              <label htmlFor="email">Email adress</label>
              <Field
                component="input"
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                className={
                  error.email
                    ? "form-control form-control-lg is-invalid"
                    : "form-control form-control-lg"
                }
              />
              {error.email ? (
                <div className="invalid-feedback">{error.email}</div>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                component="input"
                placeholder="Password"
                type="password"
                id="password"
                name="password"
                className="form-control form-control-lg"
                className={
                  error.password
                    ? "form-control form-control-lg is-invalid"
                    : "form-control form-control-lg"
                }
              />
              {error.password ? (
                <div className="invalid-feedback">{error.password}</div>
              ) : (
                ""
              )}
            </div>
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const formConnected = reduxForm({ form: "login" })(Login);

const mapStateToProps = state => {
  return { formError: state.error };
};

export default connect(
  mapStateToProps,
  { loginUser }
)(formConnected);
