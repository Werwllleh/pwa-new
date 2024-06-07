import cn from 'classnames'
import Icon from "@components/Icon";
import {Link} from "react-router-dom";
import HeaderBackButton from "./buttons/header-back-button";
import { useLocation } from "react-router-dom";
import ModalLogout from "./modals/ModalLogout";
import {useEffect, useRef, useState} from "react";


const TopBlock = ({isFixed = true}) => {

  const location = useLocation();
  const path = location.pathname;

  const [modalLogOutActive, setModalLogOutActive] = useState(false);

  const [openCallSession, setOpenCallSession] = useState(false);
  const [error, setError] = useState(null);

/*  useEffect(() => {
    if (window.webkitNotifications && window.webkitNotifications.checkPermission() != 0) {
        window.webkitNotifications.requestPermission();
    }
  }, []);*/


  useEffect(() => {
    console.log(error)
  }, [error]);

  useEffect(() => {
    if (openCallSession) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Запрос доступа к устройствам
        navigator.mediaDevices.getUserMedia({ audio: true})
          .then(() => {
            if (window.SIPml) {
              // Инициализация SIPml5
              window.SIPml.init(() => {
                const stack = new window.SIPml.Stack({
                  realm: '188.120.230.120.sslip.io', // domain
                  impi: '0100', // Private Identity
                  impu: 'sip:0100@188.120.230.120.sslip.io', // Public Identity
                  password: '0ed189c2f2563213', // Password
                  display_name: 'USER', // optional
                  websocket_proxy_url: 'wss://188.120.230.120.sslip.io:8089/ws', // WS
                  events_listener: {
                    events: 'started',
                    listener: (e) => {
                      const callSession = stack.newSession('call-audio', {
                        audio_remote: document.getElementById('audio-remote')
                      });
                      callSession.call('*43'); // Initiating call to *43
                    }
                  }
                });
                stack.start();
              });
            } else {
              setError('SIPml5 library not loaded');
            }
          })
          .catch((err) => {
            setError(`Error accessing devices: ${err.message}`);
          });
      } else {
        setError('getUserMedia not supported in this browser');
      }
    }
  }, [openCallSession]);

  const goCall = () => {
    setOpenCallSession(true);
  }


  return (
    <div className={cn('top-block', {'top-block_fixed': isFixed})}>
      <div className={cn('top-block__inner', 'container', {'container_12': isFixed})}>
        <HeaderBackButton/>
        {isFixed ? (
          <>
            {
              path === '/chat' ? (
                <>
                  <div className="top-block__title top-block__title_left">
                    <img className="top-block__avatar" src="/assets/images/reviews/user-6.png" alt=""/>
                    <span className="top-block__user-name">Горячая линия «Микрохирургия глаза»</span>
                  </div>
                  <button onClick={goCall} className="top-block__btn top-block__btn_right">
                    <Icon name="phone"/>
                  </button>
                </>
              ) : path === '/settings' ? (
                <>
                  <div className="top-block__title">
                    <span className="top-block__user-name">Настройки</span>
                  </div>
                  <button onClick={() => setModalLogOutActive(true)} className="top-block__btn top-block__btn_right" >
                    <Icon name="log-out"/>
                  </button>
                </>
              ) : null
            }
            <ModalLogout active={modalLogOutActive} onClose={() => setModalLogOutActive(false)}/>
          </>
        ) : (
          <div className="top-block__title ta_c">Уведомления</div>
        )}
      </div>
    </div>
  )
}

export default TopBlock