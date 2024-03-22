import React, { useEffect, useState, useContext } from "react";
import { getUsers } from "../../../services/api";
import { Box, styled, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addActiveUser, removeActiveUser } from "../../../store/reducers/accountReducer";
//components
import Conversation from "./Conversation";
import { useSocket } from "../../../context/SocketContext";

const Component = styled(Box)`
  height: 81vh;
  overflow: overlay;
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background-color: #e9edef;
  opacity: 0.5;
`;

function Conversations() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const account = useSelector((state) => {
    return state.account.account;
  });

  const socket = useSocket();

  useEffect(() => {
    const fetchData = async () => {
      socket && socket.emit("login", account.sub);
      let registeredUsers = await getUsers();
      setUsers(registeredUsers);
    };
    fetchData();

    const handleUserConnected = (data) => {
      console.log(data);
      dispatch(addActiveUser(data));
    };

    const handleUserDisconnected = (data) => {
      dispatch(removeActiveUser(data));
    };

    socket && socket.on("removeActiveUsers", handleUserDisconnected);
    socket && socket.on("sendActiveUsers", handleUserConnected);
  }, [account.sub, socket]);

  return (
    <Component>
      {users.map(
        (user) =>
          user.sub !== account.sub && (
            <React.Fragment key={user.sub}>
              <Conversation user={user} />
              <StyledDivider />
            </React.Fragment>
          )
      )}
    </Component>
  );
}

export default Conversations;
