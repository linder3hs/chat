import { useState } from "react";
import { Space, Modal, Input } from "antd";
import { post, get } from "../../service";

const ModalRegister = ({ fetchUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const handleOpenModal = () => setIsModalOpen(!isModalOpen);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleOnSubmit = async () => {
    const response = await post("/user", user);

    localStorage.setItem("user", JSON.stringify(response.data));

    handleOpenModal();
    await fetchUsers();
  };

  return (
    <>
      <Modal
        title="Ingresa o registrate"
        open={isModalOpen}
        onOk={handleOnSubmit}
        onCancel={handleOpenModal}
      >
        <Space
          size="large"
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          <Input
            size="large"
            name="email"
            onChange={handleOnChange}
            placeholder="Ingresa tu correo"
          />
          <Input
            size="large"
            name="name"
            onChange={handleOnChange}
            placeholder="Ingresa tu nombre"
          />
        </Space>
      </Modal>
    </>
  );
};

export default ModalRegister;
