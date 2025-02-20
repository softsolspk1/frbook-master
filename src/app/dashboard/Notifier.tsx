"use client";

import React, { useEffect, useState } from "react";
import { useWebSocket } from "./Websocket";

const ContainerNotifier: React.FC = () => {
  const [showContainer, setShowContainer] = useState(false);
  const { sendMessage } = useWebSocket();

  useEffect(() => {
    const myFunction = () => {
      setShowContainer(true);
      sendMessage("Hello from the client!");
      setTimeout(() => setShowContainer(false), 2000); // Show for 2 seconds
    };

    const intervalId = setInterval(myFunction, 5000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return <div>{<CallNotification />}</div>;
};

export default ContainerNotifier;

const CallNotification: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "200px",
        height: "100px",
        backgroundColor: "white",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1000, // Ensure this is high enough to be above other content
      }}
    >
      <p>Incoming Call</p>
    </div>
  );
};
