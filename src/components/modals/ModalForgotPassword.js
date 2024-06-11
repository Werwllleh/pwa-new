import cn from "classnames";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";

const ModalForgotPassword = ({showModal, setShowModal}) => {
  const show = {
    opacity: 1,
    display: "block"
  };

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none"
    }
  };
  return (
    <motion.div
      animate={showModal ? show : hide}
      className="modal modal-forgot-password"
    >
      <div className="modal__inner">
        <div className="modal__wrap">
          <div className="modal__content">
            <h2 className="h2 modal__title mb_12">Забыли пароль?</h2>
            <div className="text modal__text"> Чтобы установить новый пароль, нужно заново пройти авторизацию</div>
            <div className="modal__buttons">
              <Link className="button" to="/login-auth">
                Установить новый пароль
              </Link>
              <button className="button button_color-2 modal-close" onClick={() => setShowModal(false)}>Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
export default ModalForgotPassword