import { IChatItem } from "../utils";

const ChatItem = ({ item }: { item: IChatItem }) => {
  return (
    <div className={`chat-box-item-${item.turn}`}>
      {item.type !== "img" && item.type !== "loading" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item.turn === "bot" && (
            <div className={`chat-box-avatar-${item.turn}`}>A</div>
          )}
          <div className="chat-box-msg">{item.content}</div>
          {item.turn === "user" && (
            <div className={`chat-box-avatar-${item.turn}`}>C</div>
          )}
        </div>
      )}
      {item.type === "img" && (
        <div>
          <div className="chat-box-image">
            <div className="chat-box-avatar-bot">A</div>
            <img src={item.content} alt="" width="150px" height="100px" />
          </div>
        </div>
      )}
      {item.type === "loading" && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="chat-box-avatar-bot">A</div>
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
