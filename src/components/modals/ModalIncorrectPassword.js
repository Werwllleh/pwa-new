const ModalIncorrectPassword = () => {
  return (
    <div className="modal modal modal-incorrect-password" data-popup="incorrectPassword">
      <div className="modal__inner">
        <div className="modal__wrap">
          <div className="modal__content">
            <h2 className="h2 modal__title mb_12">Пароль введен <br/>неправильно более 5 раз</h2>
            <div className="text modal__text">Чтобы восстановить пароль, нужно заново пройти авторизацию</div>
            <div className="modal__buttons"><a className="button" href="/authorization-new-password.html">Установить новый пароль</a></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModalIncorrectPassword