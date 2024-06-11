import Icon from "./Icon";
import {Link, useNavigate} from "react-router-dom";
import {useUserStore} from "../store/user-store";
import ModalChatsAccess from "./modals/ModalChatsAccess";
import {useEffect, useState} from "react";


const Footer = () => {

  const navigate = useNavigate()

  const isAuthenticated = useUserStore((state) => state.isAuthenticated)

  const [isModalActive, setIsModalActive] = useState(false);


  const toggleModal = () => {
    setIsModalActive(!isModalActive);
  };

  const goToChatPage = () => {
    if (isAuthenticated) {
      navigate("/chat")
    } else {
      toggleModal()
    }
  }


  return (
    <>
      <footer className="footer">
        <div className="container">
          {isAuthenticated && (
            <div className="footer__actions">
              <Link className="button button_h-52" to="https://glorias.ru/glmhg" target="_blank">Записаться на
                коррекцию</Link>
              <Link className="button button_h-52 button_color-2 button-call" to="/call.html">
                <Icon name="phone"/>
              </Link>
            </div>
          )}
          <div className="footer__flex">
            <Link className="footer__link active" to="/">
              <Icon name="icon-logo"/>
              <span>Главная</span>
            </Link>
            <Link className="footer__link" to="https://glorias.ru/glmhg" target="_blank">
              <Icon name="appointment"/>
              <span>Запись</span>
            </Link>
            <button className="footer__link" onClick={goToChatPage}>
              <Icon name="chat"/>
              <span>Чат</span>
            </button>
          </div>
        </div>
      </footer>
      <ModalChatsAccess active={isModalActive} onClose={toggleModal}/>
    </>
  )
}

export default Footer