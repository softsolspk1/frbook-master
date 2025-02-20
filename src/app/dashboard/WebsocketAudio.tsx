"use client"

// context/WebSocketAudioProvider.tsx
import React, { createContext, useContext, ReactNode, useEffect, useCallback } from 'react';
import WebSocketAudioManager from './WebsocketAudioManager';
import Cookies from 'js-cookie';

interface WebSocketAudioContextProps {
  sendMessage: (message: any) => void;
  onMessage: (callback: (message: any) => void) => () => void;
}

const WebSocketAudioContext = createContext<WebSocketAudioContextProps>({
  sendMessage: () => {},
  onMessage: () => () => {},
});

export function WebSocketAudioProvider({ children }: { children: ReactNode }) {
  const manager = WebSocketAudioManager.getInstance();

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_WS_BASE}/ws/callnotifier?__jwt=${Cookies.get("jwt")}`;
    manager.connect(url);

    return () => {
      manager.close();
    };
  }, [manager]);

  const sendMessage = useCallback((message: any) => {
    manager.sendMessage(message);
  }, [manager]);

  const onMessage = useCallback((callback: (message: any) => void) => {
    return manager.onMessage(callback);
  }, [manager]);

  return (
    <WebSocketAudioContext.Provider value={{ sendMessage, onMessage }}>
      {children}
    </WebSocketAudioContext.Provider>
  );
}

export const useWebSocketAudio = (): WebSocketAudioContextProps => {
  const context = useContext(WebSocketAudioContext);
  if (!context) {
    throw new Error("useWebSocketAudio must be used within a WebSocketAudioProvider");
  }
  return context;
};
