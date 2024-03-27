import React, { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { styled, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../store/reducers/accountReducer";

const MenuOption = styled(MenuItem)`
  font-size: 14px;
  padding: 15px 16px 8px 16px;
  color: #4a4a4a;
`;

function HeaderMenu({ setOpenDrawer }) {
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const account = useSelector((state) => state.account.account);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setAnchor(null);
  };

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
    setOpen(true);
  };

  const signOut = () => {
    dispatch(logOut(account.sub));
  };

  return (
    <>
      <MoreVert onClick={handleClick} />
      <Menu
        anchorEl={anchor}
        keepMounted={true}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuOption
          onClick={() => {
            handleClose();
            setOpenDrawer(true);
          }}
        >
          Profile
        </MenuOption>
        <MenuOption
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </MenuOption>
      </Menu>
    </>
  );
}

export default HeaderMenu;
