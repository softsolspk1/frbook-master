"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import dynamic from 'next/dynamic';

export const AgoraC: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  const MyClientComponent = dynamic(
    () => import('./AgoraWrap').then(module => module.AgoraFinal) as any,
    { ssr: false },
  ) as any;
  
  // const initAgora = async (): Promise<IAgoraRTC> => {
  //   return (await import("agora-rtc-react")).default;
  // };

  // const [AgoraRTC, setAgoraRTC] = useState<IAgoraRTC | null>(null);

  // initAgora().then(agora => {
  //   setAgoraRTC(agora);
  // });

  // const agoraClient = useMemo(() => {
  //   if (!AgoraRTC) {
  //     return;
  //   }

  //   const client = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });

  //   return client;
  // }, [AgoraRTC]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== "undefined") {
      setReady(true);
    }
  }, []);


  if (!ready) {
    return null; // Render nothing or a loading spinner until the client is set
  }

  return (
    <MyClientComponent>
      {children}
    </MyClientComponent>
  );
};










