import React, {cloneElement, useEffect, useState} from 'react';
import Icon from "../Icon";
import {useUserStore} from "../../store/user-store";


const LayoutSettingsModal = ({active, title, onClose, className, closeButton, children}) => {


  const [classVisible, setClassVisible] = useState('');
  const [classFade, setClassFade] = useState('');
  const [formData, setFormData] = useState({});

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
    <>
      <div className={`modal ${className} ${classVisible} ${classFade}`}>
        <div className="modal__inner">
          <div className={`modal__wrap ${className.includes('phone') ? 'modal__wrap_d-f' : ''}`}>
            {!className.includes('phone') && !className.includes('password') && closeButton && (
              <div onClick={onClose} className="modal__close modal-close">
                <Icon name="close"/>
              </div>
            )}
            <div className="modal__content">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutSettingsModal;
