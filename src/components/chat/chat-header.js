import React from 'react';
import HeaderBackButton from "../buttons/header-back-button";
import Icon from "../Icon";

const ChatHeader = () => {
  return (
    <div className="top-block top-block_fixed">
      <div className="top-block__inner container container_12">
        <HeaderBackButton/>
        <div className="top-block__title top-block__title_left">
          <img className="top-block__avatar" src="/assets/images/reviews/user-6.png" alt=""/>
          <span className="top-block__user-name">Горячая линия «Микрохирургия глаза»</span>
        </div>
        <a className="top-block__btn top-block__btn_right" href="/call">
          <Icon name="phone"/>
        </a>
      </div>
    </div>
  );
};

export default ChatHeader;