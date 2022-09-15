import chatEmpty from "../../assets/chat.png";

const EmptyChat = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img width={500} src={chatEmpty} alt="chat empty" />
      <h2
        style={{
          marginTop: 20,
          fontSize: "3em",
        }}
      >
        No hay conversación
      </h2>
      <p>Aún no inicias una conversación, que esperas unete de una vez</p>
    </div>
  );
};

export default EmptyChat;
