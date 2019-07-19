import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

const Register = props => {
  const error = props.formError;
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 m-auth">
            <h1 className="display-4 text-center">Register</h1>
            <form
              onSubmit={props.handleSubmit(formValues => {
                props.registerUser(formValues, props.history);
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
                <label htmlFor="username">Email adress</label>
                <Field
                  component="input"
                  placeholder="Username"
                  type="text"
                  id="username"
                  name="username"
                  className={
                    error.username
                      ? "form-control form-control-lg is-invalid"
                      : "form-control form-control-lg"
                  }
                />
                {error.username ? (
                  <div className="invalid-feedback">{error.username}</div>
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
              <div className="form-group">
                <label htmlFor="password2">Confirm password</label>
                <Field
                  component="input"
                  placeholder="Confirm password"
                  type="text"
                  id="password2"
                  name="password2"
                  className="form-control form-control-lg"
                  className={
                    error.password2
                      ? "form-control form-control-lg is-invalid"
                      : "form-control form-control-lg"
                  }
                />
                {error.password2 ? (
                  <div className="invalid-feedback">{error.password2}</div>
                ) : (
                  ""
                )}
              </div>
              <button>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const formConnected = reduxForm({ form: "register" })(Register);

const mapStateToProps = state => {
  return {
    formError: state.error
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(formConnected);
