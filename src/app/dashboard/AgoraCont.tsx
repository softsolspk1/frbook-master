"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./CenteredButtons.module.css";

import {
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";

const LiveVideoComponent = () => {
  const appId = "64afc8d22d5b4feb84b020e1b228c806";

  // Set the connection state
  const [activeConnection, setActiveConnection] = useState(true);

  // Track the mic/video state - Turn on Mic and Camera On
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  // Get local video and mic tracks
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  // Join the channel
  useJoin(
    {
      appid: appId,
      channel: "rajs",
      token: null,
    },
    activeConnection
  );

  // Publish the local tracks
  usePublish([localMicrophoneTrack, localCameraTrack]);

  // Remote users
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // Play the remote user audio tracks
  useEffect(() => {
    audioTracks.forEach((track) => track.play());
  }, [audioTracks]);

  // Disable scrolling by setting overflow to hidden
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Create refs for local and remote video elements
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (localCameraTrack && localVideoRef.current) {
      localCameraTrack.play(localVideoRef.current);
      return () => {
        localCameraTrack.stop();
      };
    }
  }, [localCameraTrack]);

  useEffect(() => {
    remoteUsers.forEach((user) => {
      const videoElement = remoteVideoRefs.current[user.uid];
      if (user.videoTrack && videoElement) {
        console.log("Playing remote video track");
        
        user.videoTrack.play(videoElement);
      }
    });
    return () => {
      remoteUsers.forEach((user) => {
        if (user.videoTrack) {
          user.videoTrack.stop();
        }
      });
    };
  }, [remoteUsers]);

  const toggleMic = () => {
    const newMicState = !micOn;
    setMic(newMicState);
  };

  const toggleCamera = () => {
    const newCameraState = !cameraOn;
    setCamera(newCameraState);
    if (localCameraTrack) {
      localCameraTrack.setEnabled(newCameraState);
    }
  };

  const handleDisconnect = () => {
    setActiveConnection(false);
    if (localMicrophoneTrack) {
      localMicrophoneTrack.close();
    }
    if (localCameraTrack) {
      localCameraTrack.close();
    }
    // Additional cleanup if necessary
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.videoContainer}>
        <div ref={localVideoRef} className={styles.localVideo}></div>
        {remoteUsers.map((user) => (
                        <RemoteUser className={styles.remoteVideo}  user={user} /> 
        ))}
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={toggleMic}>
          {micOn ? "Mute Mic" : "Unmute Mic"}
        </button>
        <button className={styles.button} onClick={toggleCamera}>
          {cameraOn ? "Turn Off Video" : "Turn On Video"}
        </button>
        <button className={styles.button} onClick={handleDisconnect}>
          Disconnect
        </button>
      </div>
    </div>
  );
};

const LiveVideo = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <LiveVideoComponent />;
};

export default LiveVideo;
