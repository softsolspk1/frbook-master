"use client"

import Cookies from "js-cookie";
// type CallEvent struct {
// 	Channel string        `json:"channel,omitempty" bson:"channel,omitempty"`
// 	Kind    CallEventType `json:"kind" bson:"kind"`
// 	ToId    int           `json:"to_id,omitempty" bson:"_id,omitempty"`

// 	// -- extensions --
// 	// -- end --
// }


// lib/webSocketAudioManager.ts
class WebSocketAudioManager {
    private static instance: WebSocketAudioManager;
    private socket: WebSocket | null = null;
    private messageHandlers: ((message: any) => void)[] = [];
    private reconnectInterval: number = 1000; // Reconnect interval in milliseconds
  
    private constructor() {}
  
    public static getInstance(): WebSocketAudioManager {
      if (!WebSocketAudioManager.instance) {
        WebSocketAudioManager.instance = new WebSocketAudioManager();
      }
      return WebSocketAudioManager.instance;
    }
  
    public connect(url: string) {
      if (this.socket) {
        console.log("WebSocket is already connected");
        return;
      }
  
      this.socket = new WebSocket(url);
  
      this.socket.onopen = () => {
        console.log("WebSocket connection opened");
        // Reset reconnect interval on successful connection
        this.sendMessage(JSON.stringify(
            {
                "kind":4,
            }
        ));
        this.reconnectInterval = 1000;
      };
  
      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("WebSocket message received:", message);
        this.messageHandlers.forEach(handler => handler(message));
      };
  
      this.socket.onclose = (event) => {
        console.log(`WebSocket closed: ${event.code} - ${event.reason}`);
        this.socket = null;
        this.scheduleReconnect();
      };
  
      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        // Ensure reconnection in case of an error
        this.scheduleReconnect();
      };
    }
  
    private scheduleReconnect() {
      console.log(`Attempting to reconnect in ${this.reconnectInterval} ms...`);
      setTimeout(() => {
        // Reconnect with exponential backoff
        this.reconnectInterval = Math.min(this.reconnectInterval * 2, 30000); // Max interval of 30 seconds
        this.connect(`${process.env.NEXT_PUBLIC_WS_BASE}/ws/callnotifier?__jwt=${Cookies.get("jwt")}`);
      }, this.reconnectInterval);
    }
  
    public sendMessage(message: string) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(message);
      } else {
        console.error("WebSocket is not open. Ready state:", this.socket?.readyState);
      }
    }
  
    public close() {
      if (this.socket) {
        this.socket.close();
      }
    }
  
    public onMessage(callback: (message: any) => void) {
      this.messageHandlers.push(callback);
      return () => {
        this.messageHandlers = this.messageHandlers.filter(handler => handler !== callback);
      };
    }
  }
  
  export default WebSocketAudioManager;
  
export interface CallEvent {
    channel?: string;
    kind: number;
    to_id?: number;
}
