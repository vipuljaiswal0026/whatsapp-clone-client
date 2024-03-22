import React, { useEffect, useContext } from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Box, InputBase, styled } from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MicIcon from "@mui/icons-material/Mic";
import { uploadFile } from "../../../services/api";
import { sendMessage } from "../../../services/api";
import { useSelector } from "react-redux";

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const InputContainer = styled(Box)`
  background: #ffffff;
  border-radius: 20px;
  width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  height: 20px;
  padding-left: 25px;
  font-size: 14px;
`;

function ChatFooter({
  sendText,
  setTextValue,
  textValue,
  file,
  setFile,
  conversationId,
  setNewMessageFlag,
}) {
  //Access account and chatPerson states from the Redux store
  const account = useSelector((state) => state.account.account);
  const chatPerson = useSelector((state) => state.account.chatPerson);

  useEffect(() => {
    const sendFile = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const fileKey = await uploadFile(data);
        const messageDetails = {
          conversationId: conversationId,
          senderId: account.sub,
          receiverId: chatPerson.sub,
          textValue: textValue,
          fileKey: fileKey.data,
          type: file.type,
        };

        await sendMessage(messageDetails);
        setTextValue("");
        setNewMessageFlag((prev) => !prev);
      }
    };
    sendFile();
  }, [file]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setTextValue(e.target.files[0].name);
  };
  return (
    <Container>
      <InsertEmoticonIcon />
      <label htmlFor="inputfile">
        <AttachmentIcon />
      </label>
      <input
        type="file"
        id="inputfile"
        style={{ display: "none" }}
        onChange={(e) => onFileChange(e)}
      />
      <InputContainer>
        <InputField
          placeholder="type a message"
          onChange={(e) => setTextValue(e.target.value)}
          onKeyDown={(e) => sendText(e)}
          value={textValue}
        />
      </InputContainer>
      <MicIcon />
    </Container>
  );
}

export default ChatFooter;
