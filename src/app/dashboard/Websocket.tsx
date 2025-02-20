"use client"

// context/WebSocketProvider.tsx
import React, { createContext, useContext, ReactNode, useEffect, useCallback } from 'react';
import WebSocketManager from './WebsocketManager';
import Cookies from 'js-cookie';

interface WebSocketContextProps {
  sendMessage: (message: any) => void;
  onMessage: (callback: (message: any) => void) => () => void;
}

const WebSocketContext = createContext<WebSocketContextProps>({
  sendMessage: () => {},
  onMessage: () => () => {},
});

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const manager = WebSocketManager.getInstance();

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_WS_BASE}/ws/notifier?__jwt=${Cookies.get("jwt")}`;
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
    <WebSocketContext.Provider value={{ sendMessage, onMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export const useWebSocket = (): WebSocketContextProps => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
