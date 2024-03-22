import { Box, Typography, styled } from "@mui/material";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { setChatPerson } from "../../../store/reducers/accountReducer";
import { addConversation } from "../../../services/api";

const Component = styled(Box)`
  display: flex;
  height: 45px;
  padding: 13px;
  cursor: pointer;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
  padding: "0 14px",
  objectFit: "cover",
});

function Conversation({ user }) {
  const account = useSelector((state) => state.account.account);
  const dispatch = useDispatch();

  const getChatPerson = async () => {
    await addConversation({ senderId: account.sub, receiverId: user.sub });
    dispatch(setChatPerson(user));
  };

  return (
    <>
      <Component onClick={() => getChatPerson()}>
        <Box>
          <Image src={user.picture} alt="dp" />
        </Box>
        <Box>
          <Box>
            <Typography>{user.name}</Typography>
          </Box>
        </Box>
      </Component>
    </>
  );
}

export default Conversation;
