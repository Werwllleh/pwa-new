import React from "react";
import {Link} from "react-router-dom";
import Icon from "../Icon";

const ModalCallsAccess = () => {
  return (
    <div className="modal modal_w-close modal modal-calls-access" data-popup="callsAccess">
      <div className="modal__inner">
        <div className="modal__wrap">
          <div className="modal__close modal-close">
            <Icon name="close" />
          </div>
          <div className="modal__content">
            <div className="modal__picture modal__picture_calls"></div>
            <h2 className="h2 modal__title mb_24">Авторизируйтесь <br/>для доступа к звонкам</h2>
            <div className="modal__buttons">
              <Link className="button" to="/authorization.html">Авторизироваться</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModalCallsAccess