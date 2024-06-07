const ModalForgotPassword = () => {
  return (
    <div className="modal modal modal-forgot-password" data-popup="forgotPassword">
      <div className="modal__inner">
        <div className="modal__wrap">
          <div className="modal__content">
            <h2 className="h2 modal__title mb_12">Забыли пароль?</h2>
            <div className="text modal__text"> Чтобы установить новый пароль, нужно заново пройти авторизацию</div>
            <div className="modal__buttons"><a className="button" href="/authorization-new-password.html">Установить
              новый пароль</a>
              <button className="button button_color-2 modal-close">Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModalForgotPassword