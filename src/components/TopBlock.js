import cn from 'classnames'
import Icon from "@components/Icon";
import {Link} from "react-router-dom";
import HeaderBackButton from "./buttons/header-back-button";
import {useLocation, useNavigate} from "react-router-dom";
import ModalLogout from "./modals/ModalLogout";
import {useEffect, useState} from "react";


const TopBlock = ({isFixed = true}) => {

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [modalLogOutActive, setModalLogOutActive] = useState(false);


  const goCall = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({ name: "microphone" });
      console.log(permissionStatus);

      if (!navigator.getUserMedia) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia || navigator.msGetUserMedia;
      }

      if (navigator.getUserMedia) {
        if (permissionStatus.state === 'denied') {
          alert('Доступ к микрофону был отклонен. Пожалуйста, разрешите доступ в настройках приложения.');
        } else if (permissionStatus.state === 'prompt') {
          navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then((data) => {
              console.log(data);
              if (data.active) {
                navigate('/call');
              }
            })
            .catch(e => console.log(e));
        } else if (permissionStatus.state === 'granted') {
          navigate('/call');
        }
      }

    } catch (e) {
      console.log(e);
    }
  };


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
                  <button onClick={() => setModalLogOutActive(true)} className="top-block__btn top-block__btn_right">
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