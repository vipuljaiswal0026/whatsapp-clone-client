import React from "react";
import { useDispatch } from "react-redux";
import { setAccount } from "../../store/reducers/accountReducer";
import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";
import { qrCodeImage } from "../../constants/data";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { addUser } from "../../services/api";

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;

const QRCode = styled("img")({
  height: 264,
  width: 264,
  margin: "50px 0 0 50px",
});

const Title = styled(Typography)`
  font-size: 26px;
  color: #525252;
  font-weight: 300;
  font-family: inherit;
  margin-bottom: 25px;
`;

const Component = styled(Box)`
  display: flex;
`;

const Container = styled(Box)`
  padding: 56px 0 56px 56px;
`;

const dialogStyle = {
  height: "96%",
  marginTop: "12%",
  width: "60%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overflow: "hidden",
};

function LoginDialog() {
  const dispatch = useDispatch();
  const onLoginError = (res) => {
    console.log(res, "error while login");
  };

  const onLoginSuccess = async (res) => {
    const decoded = jwtDecode(res.credential);
    console.log(decoded);
    await addUser(decoded);
    dispatch(setAccount(decoded));
  };

  return (
    <>
      <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
        <Component>
          <Container>
            <Title>To use Whatsapp on your computer</Title>
            <StyledList>
              <ListItem>1. Open Whatsapp on your Computer.</ListItem>
              <ListItem>2. Tap Menu settings and select Whatsapp Web.</ListItem>
              <ListItem>3. Point your phone to this screen to capture this code</ListItem>
            </StyledList>
          </Container>
          <Box style={{ position: "relative" }}>
            <QRCode src={qrCodeImage} alt="qr-code" />
            <Box style={{ position: "absolute", top: "50%", transform: "translateX(40%)" }}>
              <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
            </Box>
          </Box>
        </Component>
      </Dialog>
    </>
  );
}

export default LoginDialog;
