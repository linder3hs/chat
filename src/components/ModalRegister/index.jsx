import { useState } from "react";
import { Space, Modal, Input } from "antd";

const ModalRegister = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOpenModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <Modal
        title="Ingresa o registrate"
        open={isModalOpen}
        onOk={handleOpenModal}
        onCancel={handleOpenModal}
      >
        <Space
          size="large"
          direction="vertical"
          style={{
            width: "100%",
          }}
        >
          <Input size="large" placeholder="Ingresa tu correo" />
          <Input size="large" placeholder="Ingresa tu nombre" />
        </Space>
      </Modal>
    </>
  );
};

export default ModalRegister;
