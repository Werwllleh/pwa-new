import Icon from "../components/Icon";
import {useEffect, useState} from "react";
import {sipConfig as config} from "../utils/consts";
import cn from 'classnames';
import {useSIPProvider, useSessionCall} from "react-sipjs";
import {SessionState} from "sip.js";

const PageCall = () => {
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [callTo, setCallTo] = useState("*43");

  const [sessionData, setSessionData] = useState(null);

  const {
    connectAndRegister,
    sessionManager,
    sessions,
    registerStatus,
    connectStatus,
  } = useSIPProvider();

  const sessionCall = useSessionCall(sessionData);
  const { hangup, mute, unmute } = sessionCall || {};

  console.log(SessionState);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      } catch (error) {
        console.error(`Error accessing media devices: ${error.message}`);
      }
    };

    requestPermissions().then(() => {
      connectAndRegister({
        username: config.impi,
        password: config.password,
      });
    });
  }, [connectAndRegister]);

  useEffect(() => {
    if (sessions) {
      Object.keys(sessions).map((sessionId) => (
        setSessionData(sessionId)
      ));
    }
  }, [sessions]);

  useEffect(() => {
    if (sessionData) {
      console.log(sessionData);
    }
  }, [sessionData]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const acceptCall = async () => {
    if (sessionManager) {
      await sessionManager.call(`sip:${callTo}@${config.realm}`);
    }
  };

  const rejectCall = () => {
    if (hangup) {
      hangup();
    }
  };

  const muteMic = () => {
    if (muted) {
      if (unmute) {
        unmute();
      }
    } else {
      if (mute) {
        mute();
      }
    }
    setMuted(!muted);
  };

  return (
    <div className={cn('page-loading-animation', {'on': loaded})}>
      <div className="call bg_3">
        <div className="call__info container">
          <div className="call__status">Соединение...</div>
          <div className="call__name">Горячая линия «Микрохирургия глаза»</div>
        </div>
        <div className="call__actions container">
          <button className={cn('call__action toggle-active', {'active': muted})} onClick={muteMic}>
            <Icon name="mic-off"/>
          </button>
          <button className="call__action call__action_reset" onClick={rejectCall}>
            <Icon name="phone"/>
          </button>
          <button style={{backgroundColor: 'green'}} className="call__action" onClick={acceptCall}>
            <Icon name="phone"/>
          </button>
          <div className="call__action toggle-active">
            <Icon name="speakers"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageCall;
