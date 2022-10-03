import { Layout, Typography } from "antd";

const { Header } = Layout;

const HeaderLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div
          className="logo"
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <img width={30} src={user?.profile_url} alt="" />
          &nbsp;&nbsp;
          <Typography.Text type="danger">{user?.name}</Typography.Text>
        </div>
      </Header>
      {children}
    </Layout>
  );
};

export default HeaderLayout;
