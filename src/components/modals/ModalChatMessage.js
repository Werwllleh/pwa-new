import Icon from "../Icon";
import {useEffect, useState} from "react";
import {useChatStore} from "../../store/chat-store";

const ModalChatMessage = () => {

  const [classVisible, setClassVisible] = useState('');
  const [classFade, setClassFade] = useState('');

  const chat = useChatStore((state) => state.chat);
  const chatModalOpen = useChatStore((state) => state.chatModalOpen);
  const selectedMessageId = useChatStore((state) => state.selectedMessageId);
  const updateChatModalOpen = useChatStore((state) => state.updateChatModalOpen)
  const updateReplyMessageId = useChatStore((state) => state.updateReplyMessageId)
  const updateSelectedMessageId = useChatStore((state) => state.updateSelectedMessageId)


  useEffect(() => {
    if (chatModalOpen) {
      setClassVisible('modal_visible');
      setTimeout(() => {
        setClassFade('modal_fade');
      }, 1);
    } else {
      setClassFade('');
      setTimeout(() => {
        setClassVisible('');
      }, 300);
    }
  }, [chatModalOpen]);

  const replyMessage = () => {
    if (selectedMessageId) {
      updateReplyMessageId(selectedMessageId);
    }
    updateChatModalOpen(false);
  }

  const copyMessage = async  () => {
    updateChatModalOpen(false);
    await navigator.clipboard.writeText(chat.find((message) => message.id === selectedMessageId).text);
    updateReplyMessageId(null);
    updateSelectedMessageId(null);
  }

  const closeModal = () => {
    updateChatModalOpen(false);
    updateReplyMessageId(null);
    updateSelectedMessageId(null);
  }


  return (
    <div className={`modal modal_type-3 modal-chat-message ${classVisible} ${classFade}`} data-popup="chatMessageActions">
      <div className="modal__inner">
        <div className="modal__wrap">
          <div onClick={closeModal} className="modal__close modal-close">
            <Icon name="close" />
          </div>
          <div className="modal__content">
            <div className="modal-message-actions">
              <button onClick={replyMessage} className="modal-message-action reply-message">
                <Icon name="reply" />
                <span>Ответить</span>
              </button>
              <button onClick={copyMessage} className="modal-message-action copy-message">
                <Icon name="copy" />
                <span>Скопировать</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    /*<div className="modal-message-actions">
      <div className="modal-message-action reply-message">
        <Icon name="reply"/>
        <span>Ответить</span>
      </div>
      <div className="modal-message-action copy-message">
        <Icon name="copy"/>
        <span>Скопировать</span>
      </div>
    </div>*/
  )
}
export default ModalChatMessage