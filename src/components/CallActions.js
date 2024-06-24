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
      try {
        sessionManager?.disconnect();
        hangup();
        navigate(-1);
      } catch (e) {
        console.log(e)
      }

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
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        console.log("enumerateDevices() не поддерживается.");
        alert("enumerateDevices() не поддерживается.")
        return;
      }

      let bluetoothDevice;
      navigator.bluetooth.requestDevice({acceptAllDevices: true})
        .then(device => {
          bluetoothDevice = device;
          device.addEventListener('gattserverdisconnected', onDisconnected);
          return device.gatt.connect();
        })
        .catch(error => console.error(error));

      function onDisconnected(event) {
        console.log('Bluetooth device disconnected', event);
        switchToInternalSpeaker();
      }

      function switchToInternalSpeaker() {
        navigator.mediaDevices.enumerateDevices()
          .then(devices => {
            const internalSpeaker = devices.find(device => device.label.includes('Speaker') && device.kind === 'audiooutput');
            if (internalSpeaker) {
              const audioElement = document.getElementById('your-audio-element-id');
              audioElement.setSinkId(internalSpeaker.deviceId)
                .then(() => {
                  console.log('Switched to internal speaker');
                })
                .catch(error => console.error('Error switching to internal speaker', error));
            }
          })
          .catch(error => console.error(error));
      }

      /*try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const outDevices = devices.filter(device => device.kind === 'audiooutput' && device.deviceId !== 'default' && device.deviceId !== 'communications');

        if (outDevices.length === 0) {
          console.log("Не найдено подходящих устройств вывода звука.");
          alert("Не найдено подходящих устройств вывода звука.")
          return;
        }

        const nextDeviceIndex = speakerActive ? 0 : (outDevices.length > 1 ? 1 : 0);
        await audioRef.current.setSinkId(outDevices[nextDeviceIndex].deviceId);
        console.log(`Звук выводится на ${outDevices[nextDeviceIndex].label}`);
        alert(`Звук выводится на ${outDevices[nextDeviceIndex].label}`);
        setSpeakerActive(!speakerActive);
      } catch (err) {
        console.log(err.name + ": " + err.message);
        alert(err.name + ": " + err.message)
      }*/
    }


    return (
      <div className="call__actions container">
        <audio ref={audioRef} autoPlay/>
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
  }
;

export default CallActions;