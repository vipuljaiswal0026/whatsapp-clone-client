import { Box, styled } from "@mui/material";
import React, { useContext, useState, useEffect, useRef } from "react";
import { chatBackgroundImage } from "../../../constants/data";
import { getMessages, sendMessage } from "../../../services/api";
import { useSelector } from "react-redux";

//components
import ChatFooter from "./ChatFooter";

import Message from "./Message";
import { useSocket } from "../../../context/SocketContext";

const Wrapper = styled(Box)`
  background-image: url(${chatBackgroundImage});
  background-size: 50%;
`;

const Component = styled(Box)`
  padding-top: 20px;
  height: 77vh;
  overflow-y: scroll;
`;

const MessageContainer = styled(Box)`
  padding: 1px 80px;
`;

function ChatMessages({ conversation }) {
  // Access account and chatPerson states from the Redux store
  const account = useSelector((state) => state.account.account);
  const chatPerson = useSelector((state) => state.account.chatPerson);
  const [textValue, setTextValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [incomingMessage, setIncomingMessage] = useState(null);
  const [newMessageFlag, setNewMessageFlag] = useState(false);
  const [file, setFile] = useState();
  const scrollRef = useRef();
  const socket = useSocket();

  useEffect(() => {
    socket &&
      socket.on("getMessage", (data) => {
        setIncomingMessage({
          ...data,
          createdAt: Date.now(),
        });
      });
  }, [socket]);

  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage.senderId) &&
      setMessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ transition: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getMessagesArray = async () => {
      const data = await getMessages(conversation._id);
      setMessages(data);
    };
    conversation._id && getMessagesArray();
  }, [conversation._id, newMessageFlag]);

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      let message = {
        senderId: account.sub,
        receiverId: chatPerson.sub,
        conversationId: conversation._id,
        type: "text",
        textValue: textValue,
      };

      socket && socket.emit("sendMessage", message);
      await sendMessage(message);
      setTextValue("");
      setNewMessageFlag((prev) => !prev);
    }
  };

  return (
    <Wrapper>
      <Component>
        {messages &&
          messages.map((message) => (
            <MessageContainer ref={scrollRef} key={message.createdAt}>
              <Message message={message} />
            </MessageContainer>
          ))}
      </Component>
      <ChatFooter
        sendText={sendText}
        setTextValue={setTextValue}
        setNewMessageFlag={setNewMessageFlag}
        textValue={textValue}
        setFile={setFile}
        file={file}
        conversationId={conversation._id}
      />
    </Wrapper>
  );
}

export default ChatMessages;
