import React, {useEffect, useRef, useState} from 'react';
import Icon from "../Icon";
import {useChatStore} from "../../store/chat-store";
import {useUserStore} from "../../store/user-store";

const ChatFooter = () => {

  const {firstName, lastName} = useUserStore((state) => [state.firstName, state.lastName]);

  const chat = useChatStore((state) => state.chat);
  const addChatMessage = useChatStore((state) => state.addChatMessage);
  const replyMessageId = useChatStore((state) => state.replyMessageId);
  const updateReplyMessageId = useChatStore((state) => state.updateReplyMessageId)


  const [messageText, setMessageText] = useState('');


  const textChange = (e) => {
    setMessageText(e.target.value)
  }

  const textField = useRef();

  const sendMessage = () => {

    if (messageText.trim()) {
      let messageSendTime = new Date().toString();

      addChatMessage({
        id: chat.length + 1,
        senderStatus: 'user',
        senderName: `${firstName} ${lastName}`,
        text: messageText.trim(),
        answerMessageId: replyMessageId ? replyMessageId : null,
        date: messageSendTime
      })
      setMessageText('')
      replyMessageId && updateReplyMessageId(null)
      textField.current.focus();
    }

  }

  const cancelReplayMessage = () => {
    replyMessageId && updateReplyMessageId(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  useEffect(() => {
    if (replyMessageId !== null) {
      textField.current.focus();
    }

  }, [replyMessageId]);

  return (
    <div className="chat-actions">
      <div className="container container_12">
        {replyMessageId && (
          <div className="chat-actions-quote">
            <div className="message__quote">
              <div
                className="message__quote-name">{chat.find((message) => message.id === replyMessageId).senderName}</div>
              <div className="message__quote-text">{chat.find((message) => message.id === replyMessageId).text}</div>
            </div>
            <span onClick={cancelReplayMessage} className="chat-actions-quote__cancel">
              <Icon name="close"/>
            </span>
          </div>
        )}
        <div className="chat-actions__inner">
          <div className="chat-attachment">
            <Icon name="attachment"/>
            <input className="chat-attachment__input" type="file"/>
          </div>
          <div className="chat-input-text">
            <textarea ref={textField} className="chat-input-text__textarea" onKeyDown={handleKeyDown}
                      onChange={textChange} value={messageText}
                      placeholder="Сообщение..."></textarea>
          </div>
          <button onClick={sendMessage} className="chat-send-message">
            <Icon name="send"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;