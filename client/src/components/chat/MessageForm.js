import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { sendMessage } from "../../actions/messagesActions";

const MessageForm = props => {
  return (
    <div className="container">
      <form
        onSubmit={props.handleSubmit(formValues => {
          props.sendMessage(formValues.message);
        })}
      >
        <div className="form-group">
          <Field
            component="input"
            type="text"
            name="message"
            id="message"
            className="form-control form-control-lg"
          />
        </div>
        <button>Send</button>
      </form>
    </div>
  );
};

const formConnected = reduxForm({ form: "message" })(MessageForm);

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { sendMessage }
)(formConnected);
