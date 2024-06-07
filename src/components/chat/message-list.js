import React, {useEffect, useRef} from 'react';
import MessageItem from "./message-item";
import {useChatStore} from "../../store/chat-store";

const MessageList = () => {

  const chat = useChatStore((state) => state.chat);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  return (
    <div className="main chat">
      <div className="chat__flex container container_12">
        <div className="chat__date">27 марта</div>
        <ul className="chat__flex container container_12">
          {chat.length ? chat.map((message) => {
            return <MessageItem key={message.id} message={message} />
          }) : null}
          <span ref={chatEndRef} className="chat__end"></span>
        </ul>
      </div>
    </div>
  );
};

export default MessageList;