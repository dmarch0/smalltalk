import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

const MessagesFeed = props => {
  return (
    <div className="card container">
      <ul
        className="list-group list-group-flush"
        style={{ width: "100%", height: "300px", overflow: "scroll" }}
      >
        {props.messages.messages.map(message => (
          <li className="list-group-item">
            <p className="lead">{message.username}</p>
            {message.text}
            <p>
              <Moment format="hh:mm">{message.date}</Moment>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return { messages: state.messages };
};

export default connect(
  mapStateToProps,
  {}
)(MessagesFeed);
