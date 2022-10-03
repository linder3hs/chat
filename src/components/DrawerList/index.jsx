import { useState } from "react";
import { Layout, List } from "antd";
import { data } from "./data";
import EmptyChat from "../EmptyChat";
import MessageList from "../Messages";

const DrawerList = ({ users }) => {
  const [showMessages, setShowMessages] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const { Sider, Content } = Layout;

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
              onClick={() => {
                setShowMessages(true);
                setSelectedUser(item);
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
          {showMessages ? <MessageList user={selectedUser} /> : <EmptyChat />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DrawerList;
