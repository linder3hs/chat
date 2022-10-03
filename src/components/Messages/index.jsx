import { useState, useEffect, useRef } from "react";
import { Input, Button, Layout } from "antd";
import { get, post } from "../../service";
import Pusher from "pusher-js";
import Message from "../Message";
import "./index.css";

const MessageList = ({ user }) => {
  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const ref = useRef(null);

  const fetchMessage = async () => {
    const { id } = JSON.parse(localStorage.getItem("user"));
    const response = await get(`/message/${id}/${user.id}`);
    setMessages(response.data);
    scroll();
  };

  const sendMessage = async () => {
    const { id } = JSON.parse(localStorage.getItem("user"));
    const data = {
      user_id: id,
      sender_id: user.id,
      message,
    };
    setMessage("");
    await post("/message", data);
    scroll();
  };

  function scroll() {
    const messageContent = document.querySelector(".message__content");
    messageContent.scrollTop = messageContent.scrollHeight;
  }

  useEffect(() => {
    fetchMessage();
  }, []);

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem("user"));
    const pusher = new Pusher("a256e2fc09da7298ea43", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("my-chat");
    channel.bind(`new-message-${id}-${user.id}`, async ({ message }) => {
      fetchMessage();
    });

    channel.bind(`new-message-${user.id}-${id}`, async ({ message }) => {
      fetchMessage();
    });
  }, []);

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
            {messages.length > 0 &&
              messages.map((message) => (
                <Message senderUser={user} message={message} />
              ))}
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
