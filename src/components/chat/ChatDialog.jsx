import React, { useState, useContext, useEffect } from "react";
import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";
import { useSelector } from "react-redux";

import EmptyChat from "./chat/EmptyChat";
import Menu from "./menu/Menu";
import ChatBox from "./chat/ChatBox";
import { SocketProvider } from "../../context/SocketContext";

const Component = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)`
  min-width: 450px;
`;

const RightComponent = styled(Box)`
  width: 73%;
  min-width: 300px;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0, 0.14);
`;

const dialogStyle = {
  height: "96%",
  margin: "60px 20px 20px 20px",
  width: "100%",
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: "0",
  boxShadow: "none",
  overflow: "hidden",
};

function ChatDialog() {
  const chatPerson = useSelector((state) => {
    return state.account.chatPerson;
  });

  return (
    <>
      <SocketProvider>
        <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true} maxWidth={"md"}>
          <Component>
            <LeftComponent>
              <Menu />
            </LeftComponent>
            <RightComponent>
              {Object.keys(chatPerson).length ? <ChatBox /> : <EmptyChat />}
            </RightComponent>
          </Component>
        </Dialog>
      </SocketProvider>
    </>
  );
}

export default ChatDialog;
