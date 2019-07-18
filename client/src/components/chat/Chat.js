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
    <div>
      <MessagesFeed />
      <MessageForm />
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { addMessage, setSocket, setTyping, addUser, removeUser, setInitUsers }
)(Chat);
