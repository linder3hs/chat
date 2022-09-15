import { Input, Button } from "antd";
import "./index.css";

const MessageList = () => {
  return (
    <div className="message-list">
      <div className="message"></div>
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
