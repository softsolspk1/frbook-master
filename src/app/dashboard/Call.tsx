"use client";

import AgoraRTC, {
  AgoraRTCProvider,
  LocalVideoTrack,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRTCClient,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";
import styles from "./CenteredButtons.module.css";
import { useEffect, useRef, useState } from "react";
import { useVideoCall } from "./VideoProvider";

function Call() {
  const { isCallActive, startCall, endCall, channelName } = useVideoCall();

  return (
    <div>
      {isCallActive ? (
        <Videos
          HangUp={endCall}
          channelName={channelName!}
          AppID={"64afc8d22d5b4feb84b020e1b228c806"}
        />
      ) : null}
    </div>
  );
}

function Videos(props: {
  channelName: string;
  AppID: string;
  HangUp: () => void;
}) {
  const { AppID, channelName, HangUp } = props;
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  usePublish([localMicrophoneTrack, localCameraTrack]);
  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });

  audioTracks.map((track) => track.play());
  const deviceLoading = isLoadingMic || isLoadingCam;

  const unit = "minmax(0, 1fr) ";
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localCameraTrack && localVideoRef.current) {
      localCameraTrack.play(localVideoRef.current);
      return () => {
        localCameraTrack.stop();
      };
    }
  }, [localCameraTrack]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (remoteUsers.length > 0) {
        for (let index = 0; index < remoteUsers.length; index++) {
          if (remoteUsers[index]?.videoTrack && remoteRef.current) {
          //   if  (remoteUsers[index].uid !== localUser.uid){

          //   }
            console.log("Starting to play remote video track after timeout");
            remoteUsers[index]!.videoTrack!.play(remoteRef.current);
            break
          }
        }
      }
    }, 1000); // Adjust the timeout as needed

    return () => {
      clearTimeout(timeout);
      if (remoteUsers.length > 0) {
        console.log("sopped");
        remoteUsers[0]?.videoTrack?.stop();
      }
    };
  }, [remoteUsers]);

  return (
    <div>
      {false ? (
        <div className="flex flex-col items-center pt-40">
          Loading devices...
        </div>
      ) : (
        <div className={styles.overlay}>
          <div className={styles.videoContainer}>
            <div ref={localVideoRef} className={styles.localVideo}></div>
            <div ref={remoteRef} className={styles.localVideo}></div>
            {remoteUsers.map((user) => (
              <RemoteUser className="hidden" user={user} />
            ))}
          </div>
          <div className={styles.buttonGroup}>
            <button onClick={HangUp} className={styles.button}>
              Hang Up
            </button>
          </div>
        </div>
      )}
    </div>
    // <div className="flex flex-col justify-between w-full h-screen p-1">
    //   <div
    //     className={`grid  gap-1 flex-1`}
    //     style={{
    //       gridTemplateColumns:
    //         remoteUsers.length > 9
    //           ? unit.repeat(4)
    //           : remoteUsers.length > 4
    //           ? unit.repeat(3)
    //           : remoteUsers.length > 1
    //           ? unit.repeat(2)
    //           : unit,
    //     }}
    //   >
    //     <LocalVideoTrack
    //       track={localCameraTrack}
    //       play={true}
    //       className="w-full h-full"
    //     />
    //     {remoteUsers.map((user) => (
    //       <RemoteUser user={user} />
    //     ))}
    //   </div>
    // </div>
  );
}

export default Call;
