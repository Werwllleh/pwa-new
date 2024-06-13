import Icon from "../components/Icon";
import {useEffect, useState} from "react";
import {sipConfig as config} from "../utils/consts";
import cn from 'classnames';
import {useSIPProvider, useSessionCall} from "react-sipjs";
import {SessionState} from "sip.js";
import CallActions from "../components/CallActions";

const PageCall = () => {

  const [loaded, setLoaded] = useState(false);
  const [callTo, setCallTo] = useState("*43");
  const [sessionData, setSessionData] = useState(null);

  const {
    connectAndRegister,
    sessionManager,
    sessions,
    registerStatus,
    connectStatus,
  } = useSIPProvider();


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
      ))
    }
  }, [sessions]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    async function doCall() {
      if (sessionManager) {
        await sessionManager.call(`sip:${callTo}@${config.realm}`);
      }
    }
    doCall();
  }, [sessionManager]);



  return (
    <div className={cn('page-loading-animation', {'on': loaded})}>
      <div className="call bg_3">
        <div className="call__info container">
          <div className="call__status">Соединение...</div>
          <div className="call__name">Горячая линия «Микрохирургия глаза»</div>
        </div>
        {sessionData !== null ? <CallActions sessionData={sessionData} /> : null}
      </div>
    </div>
  );
}

export default PageCall;
