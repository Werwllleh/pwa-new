import React, {useEffect, useRef, useState} from 'react';
import Icon from "./Icon";
import cn from 'classnames';
import {useSessionCall} from "react-sipjs";
import {useNavigate} from "react-router-dom";

const CallActions = ({sessionManager, sessionData}) => {

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
    sessionManager?.disconnect();
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

  /*const speakerToggle = async () => {

    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log("enumerateDevices() не поддерживается.");
      return;
    }

    setSpeakerActive(!speakerActive);

    navigator.mediaDevices
      .enumerateDevices()
      .then(async function (devices) {
        const outDevices = devices.filter((device) => device.kind === 'audiooutput' && device.deviceId !== 'default' && device.deviceId !== 'communications');
        console.log(outDevices)

        if (speakerActive) {
          await audioRef.current.setSinkId(outDevices[0].deviceId);
          console.log(`Audio is being output on ${outDevices[0].label}`);
        } else {
          await audioRef.current.setSinkId(outDevices[1].deviceId);
          console.log(`Audio is being output on ${outDevices[1].label}`);
        }

      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
      });

  };*/

  const speakerToggle = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log("enumerateDevices() не поддерживается.");
      alert("enumerateDevices() не поддерживается.")
      return;
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const outDevices = devices.filter(device => device.kind === 'audiooutput' && device.deviceId !== 'default' && device.deviceId !== 'communications');

      if (outDevices.length === 0) {
        console.log("No suitable audio output devices found.");
        alert("No suitable audio output devices found.")
        return;
      }

      const nextDeviceIndex = speakerActive ? 0 : (outDevices.length > 1 ? 1 : 0);
      await audioRef.current.setSinkId(outDevices[nextDeviceIndex].deviceId);
      console.log(`Audio is being output on ${outDevices[nextDeviceIndex].label}`);
      alert(`Audio is being output on ${outDevices[nextDeviceIndex].label}`);
      setSpeakerActive(!speakerActive);
    } catch (err) {
      console.log(err.name + ": " + err.message);
      alert(err.name + ": " + err.message)
    }
  };

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