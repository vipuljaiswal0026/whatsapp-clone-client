import React from "react";
import Header from "./Header";
import { Box } from "@mui/material";
import Search from "../chat/Search";
import Conversations from "./Conversations";

function Menu() {
  return (
    <Box>
      <Header />
      <Search />
      <Conversations />
    </Box>
  );
}

export default Menu;
