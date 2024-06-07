import React from 'react';
import Icon from "../Icon";
import {useNavigate} from "react-router-dom";

const HeaderBackButton = () => {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1)
  }

  return (
    <button onClick={goBack} className="top-block__btn top-block__btn_left">
      <Icon name="angle-left" />
    </button>
  );
};

export default HeaderBackButton;