import LayoutWithTopBlock from "../components/layouts/LayoutWithTopBlock";
import MessageList from "../components/chat/message-list";
import ChatFooter from "../components/chat/chat-footer";
import {useEffect} from "react";
import {useChatStore} from "../store/chat-store";
import ChatHeader from "../components/chat/chat-header";
import ModalChatMessage from "../components/modals/ModalChatMessage";

const PageChat = () => {

  const updateChat = useChatStore((state) => state.updateChat);

  useEffect(() => {
    updateChat()
  }, [updateChat]);


  return (
    <LayoutWithTopBlock isTopBlockFixed={true}>
      {/*<ChatHeader />*/}
      <MessageList />
      <ChatFooter />
      <ModalChatMessage/>
    </LayoutWithTopBlock>
  );
}

export default PageChat;