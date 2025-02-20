"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useWebSocket } from "./Websocket";
import { toast } from "react-toastify";
import stylesA from "./CallAcceptPopup.module.css";

interface VideoCallContextProps {
  isCallActive: boolean;
  channelName: string | null;
  startCall: (channelName: string) => void;
  endCall: () => void;
}

const VideoCallContext = createContext<VideoCallContextProps>({
  isCallActive: false,
  startCall: () => {},
  endCall: () => {},
  channelName: null,
});

export function VideoCallProvider({ children }: { children: ReactNode }) {
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [isIncomming, setIsIncomming] = useState<boolean>(false);
  const [currentChannel, setCurrentChannel] = useState<string | null>(null);
  const { sendMessage, onMessage } = useWebSocket();
  const [currentToId, setCurrentToId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startCall = useCallback(
    (channelName: string) => {
      setCurrentChannel(channelName);
      setIsCallActive(true);
      sendMessage({ type: "START_VIDEO_CALL", channelName });
    },
    [sendMessage]
  );

  const acceptCall = useCallback(() => {
    console.log("Accepting call from " + currentToId);

    sendMessage(JSON.stringify({ kind: 2, to_id: currentToId }));
  }, [currentToId]);

  const declineCall = useCallback(() => {
    sendMessage(JSON.stringify({ kind: 3, to_id: currentToId }));
  }, [currentToId]);

  const endCall = useCallback(() => {
    sendMessage(JSON.stringify({ kind: 3, to_id: currentToId }));
  }, [sendMessage, currentChannel]);

  useEffect(() => {
    const unregister = onMessage((message) => {
      //   if (message.type === "START_VIDEO_CALL") {
      //     setCurrentChannel(message.channelName);
      //     setIsCallActive(true);
      //   } else if (message.type === "END_VIDEO_CALL") {
      //     setIsCallActive(false);
      //     setCurrentChannel(null);
      //   }
      if (message.kind === 0) {
        setIsIncomming(true);
        setCurrentToId(message.to_id);
        console.log("Incoming call from " + message.to_id);
      }
      if (message.kind === 1) {
        setIsIncomming(false);
        setIsCallActive(true);
        console.log("Call started with " + message.to_id);

        setCurrentToId(message.to_id);
        setCurrentChannel(message.channel);
      }
      if (message.kind === 3) {
        console.log("want end now");

        setIsCallActive(false);
        setIsIncomming(false);
      }

      if (message.kind === 4) {
        setIsIncomming(false);
        setIsCallActive(false);
      }
    });

    return () => unregister();
  }, [onMessage]);

  const playAudio = () => {
    console.log("playing");
    
    if (audioRef.current) {
    console.log("playingin");
    audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    if (isIncomming) {
      playAudio();
    } else {
      pauseAudio();
    }
  }, [isIncomming]);

  return (
    <VideoCallContext.Provider
      value={{ isCallActive, startCall, endCall, channelName: currentChannel }}
    >
      <audio ref={audioRef} src={"/assets/ring.mp3"} loop  />
      <button onClick={playAudio}>Play</button>
      <button onClick={pauseAudio}>Pause</button>

      {isIncomming && (
        <div className={stylesA.popupOverlay}>
          <div className={stylesA.popupContent}>
            <h2>Incoming Call</h2>
            <p>You have an incoming call. Do you want to accept it?</p>
            <div className={stylesA.buttonGroup}>
              <button onClick={acceptCall} className={stylesA.acceptButton}>
                Accept
              </button>
              <button onClick={declineCall} className={stylesA.declineButton}>
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
      {children}
    </VideoCallContext.Provider>
  );
}

export function useVideoCall() {
  return useContext(VideoCallContext);
}
