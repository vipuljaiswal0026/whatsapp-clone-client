import React, { useContext, useState, useEffect } from "react";
import { Box, Typography, styled } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import { formatDate } from "../../../utils/commonutils";
import { useSelector } from "react-redux";
import { getPresignedUrl } from "../../../services/api";
import { iconPDF, noPreviewImage } from "../../../constants/data";

const Own = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  margin-left: auto;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Other = styled(Box)`
  background-color: #ffffff;
  max-width: 60%;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const MessageText = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  margin-top: auto;
`;

function Message({ message }) {
  const account = useSelector((state) => state.account.account);
  const [imageUrl, setImageUrl] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const fetchPresignedUrl = async (key) => {
      try {
        // Check if the presigned URL is already stored in localStorage
        const storedUrl = localStorage.getItem(key);
        if (storedUrl) {
          const { expirationTime, url } = JSON.parse(storedUrl);
          // Check if the stored URL is not expired
          if (expirationTime > Date.now()) {
            setFileUrl(url); // Use the stored URL
            if (message.type == "text") {
              setImageUrl(null);
            } else if (
              message.type == "image/jpeg" ||
              message.type == "image/jpg" ||
              message.type == "image/png"
            ) {
              setImageUrl(url);
            } else if (message.type == "application/pdf") {
              setImageUrl(iconPDF);
            } else {
              setImageUrl(noPreviewImage);
            }
            return;
          }
        }
        const { url, expiration } = await getPresignedUrl(key);

        // Store the presigned URL in localStorage along with its expiration time
        const expirationTime = Date.now() + expiration * 1000; // Convert seconds to milliseconds
        localStorage.setItem(key, JSON.stringify({ url, expirationTime }));
        setFileUrl(url);

        if (message.type == "text") {
          setImageUrl(null);
        } else if (
          message.type == "image/jpeg" ||
          message.type == "image/jpg" ||
          message.type == "image/png"
        ) {
          setImageUrl(url);
        } else if (message.type == "application/pdf") {
          setImageUrl(iconPDF);
        } else {
          setImageUrl(noPreviewImage);
        }
      } catch (error) {
        console.error("Error fetching presigned URL:", error);
      }
    };

    if (message.fileKey && message.type !== "text") {
      fetchPresignedUrl(message.fileKey);
    }
  }, [message.fileKey]);
  return (
    <>
      {account.sub === message.senderId ? (
        <Own>
          {fileUrl ? (
            <ImageMessage imageUrl={imageUrl} message={message} fileUrl={fileUrl} alt="Image" />
          ) : (
            <MessageText>{message.textValue}</MessageText>
          )}
          <Time>{formatDate(message.createdAt)}</Time>
        </Own>
      ) : (
        <Other>
          {fileUrl ? (
            <ImageMessage imageUrl={imageUrl} fileUrl={fileUrl} message={message} />
          ) : (
            <MessageText>{message.textValue}</MessageText>
          )}
          <Time>{formatDate(message.createdAt)}</Time>
        </Other>
      )}
    </>
  );
}

const ImageMessage = ({ fileUrl, imageUrl, message }) => {
  const handleDownload = (key, fileUrl) => {
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = key;
    anchor.click();
  };
  return (
    <Box>
      <img style={{ width: 200, height: "100%" }} src={imageUrl} alt="image" />
      <DownloadIcon
        onClick={() => {
          handleDownload(message.fileKey, fileUrl);
        }}
      />
      <MessageText>{message.textValue}</MessageText>
    </Box>
  );
};

export default Message;
