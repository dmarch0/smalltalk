import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { sendMessage } from "../../actions/messagesActions";

const MessageForm = props => {
  return (
    <div className="container">
      <form
        className="mb-3"
        onSubmit={props.handleSubmit(formValues => {
          props.sendMessage(formValues.message);
          props.reset();
        })}
      >
        <div className="form-group">
          <Field
            onChange={() => {
              props.messages.socket.emit("typing", props.auth.user.username);
            }}
            component="input"
            type="text"
            name="message"
            id="message"
            className="form-control form-control-lg"
          />
        </div>
        <button className="btn btn-info">Send</button>
      </form>
    </div>
  );
};

const formConnected = reduxForm({ form: "message" })(MessageForm);

const mapStateToProps = state => {
  return { messages: state.messages, auth: state.auth, users: state.users };
};

export default connect(
  mapStateToProps,
  { sendMessage }
)(formConnected);
