import {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";

const ModalLogout = ({active, onClose}) => {

  const navigate = useNavigate();


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

  const logOut = (e) => {
    e.preventDefault();
    console.log('Выход');
    onClose();
    navigate("/");
  }

  return (
    <div className={`modal modal modal-logout ${classVisible} ${classFade}`} data-popup="logout">
      <div className="modal__inner">
        <div className="modal__wrap">
          <div className="modal__content">
            <h2 className="h2 modal__title mb_24">Вы действительно хотите <br/>выйти из профиля?</h2>
            <div className="modal__buttons">
              <button onClick={logOut} className="button">Выйти</button>
              <button onClick={onClose} className="button button_color-2 modal-close">Отмена</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModalLogout