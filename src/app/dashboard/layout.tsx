import type { Metadata } from "next";
import { Providers } from "@/redux-toolkit/provider";
import { ToastContainer } from "react-toastify";
import ContainerNotifier from "./Notifier";
import { WebSocketProvider } from "./Websocket";
import { AgoraC } from "./Agora";
import LiveVideo from "./AgoraCont";
import Call from "./Call";
import AudioCall from "./Audio";
import 'react-quill/dist/quill.snow.css'; // Import Quill's default stylesheet
import "./global.css";
import { VideoCallProvider } from "./VideoProvider";
import { WebSocketAudioProvider } from "./WebsocketAudio";
import { AudioCallProvider } from "./AudioProvider";

export const metadata: Metadata = {
  title: "Respire 2",
  description: "Respire 2",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WebSocketAudioProvider>
        <WebSocketProvider>
          <AgoraC>
            <AudioCallProvider>
              <VideoCallProvider>
                <Call />
                <AudioCall />
                {children}
              </VideoCallProvider>
            </AudioCallProvider>
          </AgoraC>
          {/* {children} */}
        </WebSocketProvider>
      </WebSocketAudioProvider>
    </>
  );
}
