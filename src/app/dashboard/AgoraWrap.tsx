"use client";

import { AgoraRTCProvider, IAgoraRTC, IAgoraRTCClient } from "agora-rtc-react";
import { ReactNode, useEffect, useMemo, useState } from "react";

export const AgoraFinal: React.FC<{ children: ReactNode }> = ({ children }) => {
  
  
  const initAgora = async (): Promise<IAgoraRTC> => {
    return (await import("agora-rtc-react")).default;
  };

  const [AgoraRTC, setAgoraRTC] = useState<IAgoraRTC | null>(null);

  initAgora().then(agora => {
    setAgoraRTC(agora);
  });

  const agoraClient = useMemo(() => {
    if (!AgoraRTC) {
      return;
    }

    const client = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" });

    return client;
  }, [AgoraRTC]);

  if (!agoraClient) {
    return null; // Render nothing or a loading spinner until the client is set
  }

  return (
    <AgoraRTCProvider client={agoraClient}>
      {children}
    </AgoraRTCProvider>
  );
};










