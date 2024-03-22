import React, { useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import { MoreVert, Search } from "@mui/icons-material";

import { useSelector } from "react-redux";
const Header = styled(Box)`
  height: 44px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const Image = styled("img")({
  height: 40,
  width: 40,
  borderRadius: "50%",
  objectFit: "cover",
});

const Name = styled(Typography)`
  margin-left: 12px !important;
`;

const Status = styled(Typography)`
  margin-left: 12px !important;
  font-size: 12px;
  color: rgb(0, 0, 0, 0.6);
`;

const RightContainer = styled(Box)`
  margin-left: auto;
  & > svg {
    padding: 8px;
    font-size: 24px;
    color: #31363f;
  }
`;

function ChatHeader() {
  const { chatPerson } = useSelector((state) => state.account);
  const { activeUsers } = useSelector((state) => state.account);
  console.log(activeUsers);
  return (
    <Header>
      <Image src={chatPerson.picture} alt="dp" onClick={() => toggleDrawer()} />
      <Box>
        <Name>{chatPerson.name}</Name>
        <Status>
          {activeUsers.some((user) => user.userId === chatPerson.sub) ? "Online" : "Offline"}
        </Status>
      </Box>
      <RightContainer>
        <Search />
        <MoreVert />
      </RightContainer>
    </Header>
  );
}

export default ChatHeader;
