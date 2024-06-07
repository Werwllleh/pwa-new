import React, {useEffect} from 'react';
import Icon from "../Icon";



const modal = document.getElementById("react-modals");

const LayoutModal = ({modalName, title, active, onClose, className, closeButton, children}) => {


  return (
    <>
      <div className={`modal ${className} ${{/*show*/}} ${{/*showFade*/}}`}>
        <div className="modal__inner">
          <div className="modal__wrap">
            {closeButton && (
              <div className="modal__close modal-close">
                <Icon name="close" />
              </div>
            )}
            <div className="modal__content">
              {title && <h2 className="modal__title">{title}</h2>}
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutModal;
