import { useEffect, useState } from "react";
import { IChatItem } from "../utils";
import ChatItem from "./chatItem";
import SendMessage from "./sendMessage";

const ChatBox = () => {
  const [chatItems, setChatItems] = useState<IChatItem[]>([]);
  const [turn, setTurn] = useState<String>("");
  const [msgIdx, setMsgIdx] = useState(0);

  const API_MSG = "http://localhost:5000/api/messages";
  const API_Story = "http://localhost:5000/api/story";
  const API_Image = "http://localhost:5000/api/image";

  const fetchMSG = () => {
    fetch(`${API_MSG}/${msgIdx}`)
      .then((res) => res.json())
      .then((res) => {
        setMsgIdx(msgIdx + 1);
        addChatItem({
          turn: "bot",
          ...res,
        });
      });
  };

  const fetchStory = () => {
    fetch(`${API_Story}`)
      .then((res) => res.json())
      .then((res) => {
        addChatItem({
          turn: "bot",
          ...res,
        });
      });
  };

  const fetchImage = () => {
    fetch(`${API_Image}`)
      .then((res) => res.json())
      .then((res) => {
        addChatItem({
          turn: "bot",
          ...res,
        });
      });
  };

  const chatLoading = {
    turn: "bot",
    type: "loading",
    content: "Loading...",
  };

  const chatStory = {
    turn: "bot",
    type: "message",
    content: "Here is the start of the story you asked for. enjoy!",
  };

  const chatImage = {
    turn: "bot",
    type: "message",
    content:
      "Here is the character portrait you requested for 'warhammer space trader'",
  };

  const addChatItem = (chatItem: IChatItem) => {
    setChatItems((chatItems) => [...chatItems, chatItem]);
    if (chatItem.type === "story") {
      setChatItems((chatItems) => [...chatItems, chatLoading]);
      setTimeout(() => {
        setChatItems((chatItems) => [...chatItems, chatStory]);
        fetchStory();
        setTurn("user");
        
      }, 10000);
    }
    if (chatItem.type === "image") {
      setChatItems((chatItems) => [...chatItems, chatLoading]);
      setTimeout(() => {
        setChatItems((chatItems) => [...chatItems, chatImage]);
        fetchImage();
        setTurn("user");
      }, 30000);
    }
  };

  useEffect(() => {
    setTurn("bot");
  }, []);

  useEffect(() => {
    if (turn === "bot") {
      fetchMSG();
      setTurn("user");
    }
  }, [turn]);

  return (
    <div className="chat-box">
      <div>
        {chatItems.map((chatItem, idx) => (
          <ChatItem item={chatItem} key={idx} />
        ))}
      </div>
      <SendMessage addChatItem={addChatItem} setTurn={setTurn} />
    </div>
  );
};

export default ChatBox;
