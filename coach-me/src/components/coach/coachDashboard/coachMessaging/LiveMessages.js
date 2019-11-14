import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessageHistory,
  postMessage
} from "../../../../actions/coachActions";
import "./coachMessaging.scss";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import { of } from "rxjs";
import socketIOClient from "socket.io-client";

function LiveMessages(props) {
  //   const socket = socketIOClient("http://localhost:4000/");
  //   socket.on("connect", () => {
  //     socket.send("hi");
  //     socket.on("message", msg => {});
  //   });
  console.log(props);
  const { clientprofile } = props;
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [message, setMessage] = useState({
    message: "",
    Phone: ""
  });

  useEffect(() => {
    if (clientprofile) {
      dispatch(getMessageHistory(clientprofile.clientPhone));
      setMessage({ ...message, Phone: clientprofile.clientPhone });
    }
    // eslint-disable-next-line
  }, [clientprofile]);

  useEffect(() => {
    if (clientprofile) {
      const interval = setInterval(() => {
        dispatch(getMessageHistory(clientprofile && clientprofile.clientPhone));
      }, `${process.env.REACT_APP_SET_INTERVAL}`);
      return () => clearInterval(interval);
    }
  }, [clientprofile]);

  const handleInputChange = e => {
    setMessage({ ...message, message: e.target.value });
  };

  const submitNewMessage = e => {
    e.preventDefault();

    dispatch(postMessage(message));

    setMessage({ ...message, message: "" });
  };

  const onEnterPress = e => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      {
        dispatch(postMessage(message));
      }
      setMessage({ ...message, message: "" });
      // e.preventDefault();
    }
  };

  return (
    <div>
      {/* contains get request twilio data */}

      <PerfectScrollbar className="scrollbar-container">
        <ScrollToBottom>
          <div className="message-container">
            {state.coach.messageHistory &&
              state.coach.messageHistory.map((m, i) => (
                <div
                  key={i}
                  className={`messages ${
                    m.direction === "inbound" ? "left" : "right"
                  }`}
                >
                  <p className="text">{m.body}</p>
                  <p className="time">
                    {moment(m.dateSent).format("MMMM Do YYYY, h:mm a")}
                  </p>
                </div>
              ))}
          </div>
        </ScrollToBottom>
      </PerfectScrollbar>

      <form className="text-input" onSubmit={submitNewMessage}>
        <div className="submit">
          <textarea
            data-cy="message"
            onsubmit={submitNewMessage}
            onKeyDown={onEnterPress}
            rows="1"
            cols="48"
            onChange={handleInputChange}
            value={message.message}
            type="text"
            placeholder="Write messages"
            id="messageForm"
          ></textarea>
          <button>
            <img src="https://i.imgur.com/jT0eF6E.png" alt="lil arrow"></img>
          </button>
        </div>
      </form>
    </div>
  );
}

export default LiveMessages;
