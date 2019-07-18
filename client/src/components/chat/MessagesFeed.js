import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

const MessagesFeed = props => {
  const peopleTyping = Object.keys(props.typing).filter(
    username => username !== props.auth.user.username
  );
  const typingString =
    peopleTyping.length >= 3
      ? `Several people are typing`
      : peopleTyping.length === 2
      ? `${peopleTyping[0]} and ${peopleTyping[1]} are typing`
      : peopleTyping.length === 1
      ? `${peopleTyping[0]} is typing`
      : ``;
  return (
    <div className="card container">
      <ul
        className="list-group list-group-flush"
        style={{ width: "100%", height: "300px", overflow: "scroll" }}
        id="chat-feed"
      >
        {props.messages.messages.map((message, index) => (
          <li className="list-group-item" key={index}>
            <p className="lead">{message.username}</p>
            {message.private ? <p>private</p> : null}
            <p style={message.private ? { color: "purple" } : {}}>
              {message.text}
            </p>
            <p>
              <Moment format="hh:mm">{message.date}</Moment>
            </p>
          </li>
        ))}
      </ul>
      <p>{typingString}</p>
    </div>
  );
};

const mapStateToProps = state => {
  return { messages: state.messages, typing: state.typing, auth: state.auth };
};

export default connect(
  mapStateToProps,
  {}
)(MessagesFeed);
