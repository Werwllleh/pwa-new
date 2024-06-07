import React, { useState, useRef, useEffect } from 'react';

const UseCall = () => {
  const [sipStack, setSipStack] = useState(null);
  const [sipSessionRegister, setSipSessionRegister] = useState(null);
  const [sipSessionCall, setSipSessionCall] = useState(null);
  const [sipSessionTransferCall, setSipSessionTransferCall] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [disableVideo, setDisableVideo] = useState(false);
  const [notifICall, setNotifICall] = useState(null);
  const [configCall, setConfigCall] = useState(null);
  const [readyStateTimer, setReadyStateTimer] = useState(null);

  const ringtoneRef = useRef(null);
  const ringbacktoneRef = useRef(null);
  const videoLocalRef = useRef(null);
  const videoRemoteRef = useRef(null);
  const audioRemoteRef = useRef(null);

  useEffect(() => {
    ringtoneRef.current = document.getElementById("ringtone");
    ringbacktoneRef.current = document.getElementById("ringbacktone");

    Notification.requestPermission();

    SIPml.setDebugLevel((window.localStorage && window.localStorage.getItem('org.doubango.expert.disable_debug') === "true") ? "error" : "info");

    const stack = new SIPml.Stack({
      realm: "188.120.230.120.sslip.io",
      impi: "0100",
      impu: "sip:0100@188.120.230.120.sslip.io",
      password: "0ed189c2f2563213",
      display_name: "0100",
      websocket_proxy_url: "wss://188.120.230.120.sslip.io:8089/ws",
      outbound_proxy_url: "", // (window.localStorage ? window.localStorage.getItem('org.doubango.expert.sip_outboundproxy_url') : null),
      ice_servers: "", // (window.localStorage ? window.localStorage.getItem('org.doubango.expert.ice_servers') : null),
      enable_rtcweb_breaker: "", // (window.localStorage ? window.localStorage.getItem('org.doubango.expert.enable_rtcweb_breaker') == "true" : false),
      events_listener: { events: '*', listener: onSipEventStack },
      enable_early_ims: "", // (window.localStorage ? window.localStorage.getItem('org.doubango.expert.disable_early_ims') != "true" : true), // Must be true unless you're using a real IMS network
      enable_media_stream_cache: "", // (window.localStorage ? window.localStorage.getItem('org.doubango.expert.enable_media_caching') == "true" : false),
      // bandwidth: (window.localStorage ? tsk_string_to_object(window.localStorage.getItem('org.doubango.expert.bandwidth')) : null), // could be redefined a session-level
      // video_size: (window.localStorage ? tsk_string_to_object(window.localStorage.getItem('org.doubango.expert.video_size')) : null), // could be redefined a session-level
      sip_headers: [
        { name: 'User-Agent', value: 'IM-client/OMA1.0 sipML5-v1.2016.03.04' },
        { name: 'Organization', value: 'Doubango Telecom' }
      ]
    });

    if (stack.start() !== 0) {
      console.log('<b>Failed to start the SIP stack</b>');
    } else {
      setSipStack(stack);
    }
  }, []);

  const onSipEventStack = (e) => {
    // Handle SIP events here
  };

  const sipRegister = () => {
    if (sipStack) {
      // Perform registration logic here
    }
  };

  return (
    <div>
      <button onClick={sipRegister}>Register</button>
      <audio id="ringtone" ref={ringtoneRef}></audio>
      <audio id="ringbacktone" ref={ringbacktoneRef}></audio>
      <video id="video-local" ref={videoLocalRef}></video>
      <video id="video-remote" ref={videoRemoteRef}></video>
      <audio id="audio-remote" ref={audioRemoteRef}></audio>
    </div>
  );
};

export default UseCall;
