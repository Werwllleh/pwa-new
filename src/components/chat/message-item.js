import React from 'react';
import { format } from 'date-fns';
import cn from  'classnames';
import Icon from "../Icon";
import {useChatStore} from "../../store/chat-store";


const MessageItem = ({message}) => {
  const chat = useChatStore((state) => state.chat);

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
    <li
      onClick={() => messageActionsModal(true, message.id)}
      className={cn('message', {'message_outgoing': message.senderStatus==='user'}, {'message_incoming': message.senderStatus==='clinic'})}
      data-name={message.senderName}
    >
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