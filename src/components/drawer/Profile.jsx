import { Box, Typography, styled } from "@mui/material";
import { useContext } from "react";
import React from "react";
import { useSelector } from "react-redux";

const ImageContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;

const BoxWrapper = styled(Box)`
  background: #ffffff;
  padding: 12px 30px 2px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.08);
  & :first-of-type {
    font-size: 13px;
    color: #009688;
    font-weight: 200;
  }
  & :last-child {
    margin: 14px 0;
    color: #4a4a4a;
  }
`;

const DescriptionContainer = styled(Box)`
  padding: 15px 20px 28px 30px;
  & > p {
    font-size: 13px;
    color: #8696a0;
  }
`;

const Image = styled("img")({
  width: 200,
  height: 200,
  borderRadius: "50%",
  padding: "25px 0",
});

function Profile() {
  const account = useSelector((state) => state.account.account);
  return (
    <>
      <ImageContainer>
        <Image src={account.picture} alt="dp" />
      </ImageContainer>
      <BoxWrapper>
        <Typography>Your name</Typography>
        <Typography>{account.name}</Typography>
      </BoxWrapper>
      <DescriptionContainer>
        <Typography>
          This is not your username or PIN. This name will be visible to all your contacts.
        </Typography>
      </DescriptionContainer>
      <BoxWrapper>
        <Typography>About</Typography>
        <Typography>Eat! Sleep! Repeat!</Typography>
      </BoxWrapper>
    </>
  );
}

export default Profile;
