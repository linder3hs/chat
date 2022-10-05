import { useState, useEffect, useRef } from "react";
import { Input, Button, Layout } from "antd";
import { post } from "../../service";
import Pusher from "pusher-js";
import Message from "../Message";
import "./index.css";

const MessageList = ({ user, messages, fetchMessage }) => {
  const [message, setMessage] = useState("");

  const { id } = JSON.parse(localStorage.getItem("user"));

  const ref = useRef(null);

  const sendMessage = async () => {
    const data = {
      user_id: id,
      sender_id: user.id,
      message,
    };
    setMessage("");
    await post("/message", data);
    fetchMessage(user);
    scroll();
  };

  function scroll() {
    const messageContent = document.querySelector(".message__content");
    messageContent.scrollTop = messageContent.scrollHeight;
  }

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem("user"));
    const pusher = new Pusher("a256e2fc09da7298ea43", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("my-chat");
    channel.bind(`new-message-${id}-${user.id}`, async ({ message }) => {
      fetchMessage(user);
    });

    channel.bind(`new-message-${user.id}-${id}`, async ({ message }) => {
      console.log("new message", message);
      fetchMessage(user);
    });
  }, []);

  useEffect(() => {
    scroll();
  }, [messages]);

  return (
    <div className="message-list">
      <div className="message">
        <div className="message__content">
          <Layout.Header theme="light" className="header__container">
            <div className="header">
              <img
                width={40}
                height={40}
                className="message__content__avatar__img"
                src={user.profile_url}
                alt=""
              />
              <h4 className="">
                Conversation with <strong>{user.name}</strong>
              </h4>
            </div>
          </Layout.Header>
          <div className="message__content__avatar" ref={ref}>
            <Message senderUser={user} messages={messages} />
          </div>
        </div>
      </div>
      <div className="input-message">
        <Input.Group>
          <Input
            size="large"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            value={message}
            style={{
              width: "calc(100% - 100px)",
            }}
          />
          <Button size="large" type="primary" onClick={sendMessage}>
            Enviar
          </Button>
        </Input.Group>
      </div>
    </div>
  );
};

export default MessageList;
