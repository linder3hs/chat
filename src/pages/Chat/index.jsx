import { useState, useEffect } from "react";
import { ModalRegister, DrawerList } from "../../components";
import HeaderLayout from "../../layout";
import { get } from "../../service";
import Pusher from "pusher-js";

const Chat = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { id } = JSON.parse(localStorage.getItem("user"));

    const response = await get(`/user/${id}`);

    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const pusher = new Pusher("a256e2fc09da7298ea43", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("my-chat");
    channel.bind("my-list-contacts", async ({ message }) => {
      console.log("message from pusher", message);
    });
  }, []);

  return (
    <HeaderLayout>
      {users.length > 0 && <DrawerList users={users} />}
      <ModalRegister fetchUsers={fetchUsers} />
    </HeaderLayout>
  );
};

export default Chat;
