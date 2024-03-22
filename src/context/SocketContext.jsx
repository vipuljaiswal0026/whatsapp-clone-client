import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

// Create a context to hold the socket instance
const SocketContext = createContext();

// Custom hook to access the socket context
export const useSocket = () => useContext(SocketContext);

// Context provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  // Initialize the socket instance when the component mounts
  useEffect(() => {
    const newSocket = io("http://localhost:8000"); // Your socket server URL
    setSocket(newSocket);

    // Clean up function to close the socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
