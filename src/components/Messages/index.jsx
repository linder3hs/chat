import { Input, Button, Layout } from "antd";
import "./index.css";

const MessageList = ({ user }) => {
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
          <div className="message__content__avatar"></div>
        </div>
      </div>
      <div className="input-message">
        <Input.Group>
          <Input
            size="large"
            placeholder="Escribe un mensaje..."
            style={{
              width: "calc(100% - 100px)",
            }}
          />
          <Button size="large" type="primary">
            Enviar
          </Button>
        </Input.Group>
      </div>
    </div>
  );
};

export default MessageList;
