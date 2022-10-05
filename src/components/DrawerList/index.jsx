import { useState } from "react";
import { Layout, List } from "antd";
import EmptyChat from "../EmptyChat";
import MessageList from "../Messages";
import { get } from "../../service";

const DrawerList = ({ users }) => {
  const [showMessages, setShowMessages] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [messages, setMessages] = useState([]);

  const { Sider, Content } = Layout;

  const { id } = JSON.parse(localStorage.getItem("user"));

  const fetchMessage = async (item) => {
    const response = await get(`/message/${id}/${item.id}`);
    console.log(response.data);
    setMessages(response.data);
  };

  return (
    <Layout>
      <Sider
        theme="light"
        width={300}
        style={{
          overflow: "auto",
          height: "100vh",
        }}
      >
        <List
          size="large"
          header={<div>Contactos</div>}
          bordered
          dataSource={users}
          renderItem={(item) => (
            <List.Item
              onClick={async () => {
                setShowMessages(true);
                setSelectedUser(item);
                await fetchMessage(item);
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <List.Item.Meta
                avatar={
                  <img
                    width={30}
                    style={{
                      borderRadius: 50,
                    }}
                    src={item.profile_url}
                    alt={item.name}
                  />
                }
                title={<span>{item.name}</span>}
              />
            </List.Item>
          )}
        />
      </Sider>
      <Layout>
        <Content>
          {showMessages ? (
            <MessageList
              user={selectedUser}
              messages={messages}
              fetchMessage={fetchMessage}
            />
          ) : (
            <EmptyChat />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DrawerList;
