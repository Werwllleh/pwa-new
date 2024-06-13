import React, {useEffect, useRef, useState} from 'react';
import Icon from "./Icon";
import cn from 'classnames';
import {useSessionCall} from "react-sipjs";
import {useNavigate} from "react-router-dom";

const CallActions = ({sessionData}) => {

  const [muted, setMuted] = useState(false);
  const [speakerActive, setSpeakerActive] = useState(false);
  const audioRef = useRef(null);

  const {
    isHeld,
    isMuted,
    decline,
    hangup,
    hold,
    mute,
    answer,
    session,
    unhold,
    unmute,
    direction,
    timer,
  } = useSessionCall(sessionData);

  const navigate = useNavigate();

  const rejectCall = () => {
    hangup();
    navigate(-1);
  }

  const muteMic = () => {

    setMuted(!muted);

    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  }

  const speakerToggle = async () => {
    if (audioRef.current && typeof audioRef.current.setSinkId === 'function') {
      try {
        const deviceId = speakerActive ? 'default' : 'communications'; // Пример идентификаторов устройств
        await audioRef.current.setSinkId(deviceId);
        setSpeakerActive(!speakerActive);
        console.log(`Audio output device set to ${deviceId}`);
      } catch (error) {
        console.error('Error setting audio output device:', error);
      }
    } else {
      console.warn('setSinkId is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (session && session.sessionDescriptionHandler) {
      const remoteStream = new MediaStream();
      session.sessionDescriptionHandler.peerConnection.getReceivers().forEach(receiver => {
        if (receiver.track) {
          remoteStream.addTrack(receiver.track);
        }
      });
      if (audioRef.current) {
        audioRef.current.srcObject = remoteStream;
      }
    }
  }, [session]);


  return (
    <div className="call__actions container">
      <audio ref={audioRef} autoPlay />
      <button className={cn('call__action toggle-active', {'active': muted})} onClick={muteMic}>
        <Icon name="mic-off"/>
      </button>
      <button className="call__action call__action_reset" onClick={rejectCall}>
        <Icon name="phone"/>
      </button>
      <button className={cn('call__action toggle-active', {'active': speakerActive})} onClick={speakerToggle}>
        <Icon name="speakers"/>
      </button>
    </div>
  );
};

export default CallActions;