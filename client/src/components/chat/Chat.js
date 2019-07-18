import React, { useEffect } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";

import MessagesFeed from "./MessagesFeed";
import MessageForm from "./MessageForm";
import { addMessage, setSocket } from "../../actions/messagesActions";
import { setTyping } from "../../actions/typingActions";
import { addUser, removeUser, setInitUsers } from "../../actions/usersActions";

const Chat = props => {
  useEffect(() => {
    const token = localStorage.token;
    const socket = io
      .connect("http://localhost:4000", {
        query: { token: token }
      })
      .on("message", message => {
        props.addMessage(message);
        if (message.flag === "connection") {
          //props.addUser(message.username);
          props.setInitUsers(message.connectedUsers);
        }
        const chatFeed = document.getElementById("chat-feed");
        chatFeed.scrollTop = chatFeed.scrollHeight;
      })
      .on("typing", username => {
        props.setTyping(username);
      })
      .on("disconnect", username => {
        props.removeUser(username);
      });
    props.setSocket(socket);
  }, []);

  return (
    <div className="container">
      <MessagesFeed />
      <MessageForm />
      <h1>Connected users:</h1>
      <ul className="list-group col-md-4">
        {props.users.map(user => (
          <li className="list-group-item">{user}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return { users: state.users };
};

export default connect(
  mapStateToProps,
  { addMessage, setSocket, setTyping, addUser, removeUser, setInitUsers }
)(Chat);
