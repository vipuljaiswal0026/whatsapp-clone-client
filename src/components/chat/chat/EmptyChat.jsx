import { Box, Typography, styled, Divider } from "@mui/material";
import React from "react";
import { emptyChatImage } from "../../../constants/data";

const Component = styled(Box)`
  background: #f8f9fa;
  padding: 30px 0;
  text-align: center;
  height: 100vh;
`;

const ImageContainer = styled(Box)`
  padding: 0 200px;
`;

const Image = styled("img")({
  width: 400,
  marginTop: 100,
});

const Title = styled(Typography)`
  font-size: 32px;
  margin: 25px 0 10px 0;
  font-weight: 300;
  font-family: Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell,
    Fira Sans, sans-serif;
  color: #41525;
`;

const SubTitle = styled(Typography)`
  font-size: 14px;
  color: #667781;
  font-weight: 400;
  font-family: Segoe UI, Helvetica Neue, Helvetica, Lucida Grande, Arial, Ubuntu, Cantarell,
    Fira Sans, sans-serif;
`;

const StyledDivider = styled(Divider)`
  margin: 40px 0;
  opacity: 0.4;
`;

function EmptyChat() {
  return (
    <>
      <Component>
        <ImageContainer>
          <Image src={emptyChatImage} alt="image" />
          <Title>WhatsApp Web</Title>
          <SubTitle>
            Make calls, share your screen and get a faster experience when you download the Windows
            app.
          </SubTitle>
          <StyledDivider />
        </ImageContainer>
      </Component>
    </>
  );
}

export default EmptyChat;
