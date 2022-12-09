import { useState } from "react";

const SendMessage = ({ addChatItem, setTurn }: { addChatItem: any, setTurn: any }) => {

  const [message, setMessage] = useState("");

  const clickSendBtn = (e: any) => {
    e.preventDefault();
    addChatItem({
      turn: "user",
      type: "message",
      content: message,
    });
    setTurn("bot");
    setMessage("");
  }

  return (
    <div className="message-area">
      <textarea
        className="message"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
      />
      <button className="send-btn" onClick={clickSendBtn}> Send </button>
    </div>
  )
}

export default SendMessage;