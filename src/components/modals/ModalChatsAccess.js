import Icon from "../Icon";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const ModalChatsAccess = ({ active, onClose }) => {

  const [classVisible, setClassVisible] = useState('');
  const [classFade, setClassFade] = useState('');

  useEffect(() => {
    if (active) {
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
  }, [active]);

  return (
    <div className={`modal modal_w-close modal modal-chats-access ${classVisible} ${classFade}`} data-popup="chatsAccess">
      <div className="modal__inner">
        <div className="modal__wrap">
          <div onClick={onClose} className="modal__close modal-close">
            <Icon name="close" />
          </div>
          <div className="modal__content">
            <div className="modal__picture modal__picture_chats"></div>
            <h2 className="h2 modal__title mb_24">Авторизируйтесь <br/>для доступа к чатам</h2>
            <div className="modal__buttons">
              <Link className="button" to="/authorization.html">Авторизироваться</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModalChatsAccess