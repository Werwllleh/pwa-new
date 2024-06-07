import React from 'react';
import Icon from "../Icon";
import {useUserStore} from "../../store/user-store";
import {useChatStore} from "../../store/chat-store";
import { format } from 'date-fns';


const MessageItem = ({message}) => {


  const chat = useChatStore((state) => state.chat);
  const currentUser = useUserStore((state) => state.currentUser);

  const updateSelectedMessageId = useChatStore((state) => state.updateSelectedMessageId)
  const updateChatModalOpen = useChatStore((state) => state.updateChatModalOpen)

  const messageActionsModal = (active, messageId) => {
    if (active) {
      updateChatModalOpen(active)
      updateSelectedMessageId(messageId)
    } else {
      updateChatModalOpen(false)
      updateSelectedMessageId(null)
    }
  }

  return (
    <li onClick={() => messageActionsModal(true, message.id)} className={`message ${currentUser.status === message.senderStatus ? 'message_outgoing' : 'message_incoming'}`} data-name={message.senderName}>
      <div className="message__inner">
        {
          message.answerMessageId && (
            <div className="message__quote">
              <div className="message__quote-name">{chat.find((el) => el.id === message.answerMessageId).senderName}</div>
              <div className="message__quote-text">{chat.find((el) => el.id === message.answerMessageId).text}</div>
            </div>
          )
        }
        <div className="message__text">{message.text}</div>
        <div className="message__info">
          <div className="message__time">{format(message.date, 'HH:mm')}</div>
          <div className="message__status">
            <Icon name="tick-12"/>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MessageItem;