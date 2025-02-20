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
import styles from "./CenteredCallButtons.module.css";
import { useEffect, useRef } from "react";
import { useAudioCall } from "./AudioProvider";
import { ImagePath } from "@/utils/constant";
import CustomImage from "@/Common/CustomImage";

function AudioCall() {
  const { isCallActive, startCall, endCall, channelName, image1, image2 } = useAudioCall();

  return (
    //   <div className={stylesA.popupOverlay}>
    //   <div className={stylesA.popupContent}>
    //     <h2>Incoming Call</h2>
    //     <p>You have an incoming call. Do you want to accept it?</p>
    //     <div className={stylesA.buttonGroup}>
    //       <button className={stylesA.acceptButton}>Accept</button>
    //       <button className={stylesA.declineButton}>Decline</button>
    //     </div>
    //   </div>
    // </div>
    <div>
      {isCallActive ? (
        <AudioC
          image1={image1}
          image2={image2}
          HangUp={endCall}
          channelName={"test"}
          AppID={"64afc8d22d5b4feb84b020e1b228c806"}
        />
      ) : null}
    </div>
  );
}

function AudioC(props: {
  channelName: string;
  AppID: string;
  image1: string | null;
  image2: string | null;
  HangUp: () => void;
}) {
  const { AppID, channelName,image1, image2, HangUp } = props;
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  usePublish([localMicrophoneTrack]);
  useJoin({
    appid: AppID,
    channel: channelName,
    token: null,
  });

  audioTracks.map((track) => track.play());
  const deviceLoading = isLoadingMic;

  const unit = "minmax(0, 1fr) ";
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      {false ? (
        <div className="flex flex-col items-center pt-40">
          Loading devices...
        </div>
      ) : (
        <div className={styles.overlay}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              {
                image1 && <CustomImage src={`${process.env.NEXT_PUBLIC_API_BASE}/assets/${image1!}`} alt="Remote User Avatar" />
              }
              {
                !image1 && <CustomImage src={`${ImagePath}/user-sm/def.jpg`} alt="Remote User Avatar" />
              }
            </div>
            <div className={styles.avatar}>
              {
                image2 && <CustomImage src={`${process.env.NEXT_PUBLIC_API_BASE}/assets/${image2!}`} alt="Remote User Avatar" />
              }
              {
                !image2 && <CustomImage src={`${ImagePath}/user-sm/def.jpg`} alt="Remote User Avatar" />
              }
            </div>
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

export default AudioCall;
