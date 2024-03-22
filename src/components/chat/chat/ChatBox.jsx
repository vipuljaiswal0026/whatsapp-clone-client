import { Box, Typography, styled } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { getConversation } from "../../../services/api.js";

import ChatMessages from "./ChatMessages";
import ChatHeader from "./ChatHeader";

function ChatBox() {
  // Access account and chatPerson states from the Redux store
  const account = useSelector((state) => state.account.account);
  const chatPerson = useSelector((state) => state.account.chatPerson);
  const [conversation, setConversation] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      let data = await getConversation({ senderId: account.sub, receiverId: chatPerson.sub });
      setConversation(data);
    };

    getConversationDetails();
  }, [chatPerson.sub]);

  return (
    <>
      <ChatHeader />
      <ChatMessages conversation={conversation} />
    </>
  );
}

export default ChatBox;
