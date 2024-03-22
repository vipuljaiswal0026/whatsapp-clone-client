// accountReducer.js

// Define action types
const SET_ACCOUNT = "SET_ACCOUNT";
const SET_CHAT_PERSON = "SET_CHAT_PERSON";
const LOGOUT = "LOGOUT"; // Define a new action type for logout
const ADD_ACTIVE_USER = "ADD_ACTIVE_USER";
const REMOVE_ACTIVE_USER = "REMOVE_ACTIVE_USER";

// Define initial state
const initialState = {
  account: null,
  chatPerson: {},
  activeUsers: [],
};

// Reducer function
const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT:
      console.log(action.payload);
      return { ...state, account: action.payload };
    case SET_CHAT_PERSON:
      return { ...state, chatPerson: action.payload };
    case LOGOUT: // Handle logout action
      return initialState; // Reset state to initial values
    case ADD_ACTIVE_USER: // Handle logout action
      console.log(action.payload);
      return { ...state, activeUsers: action.payload };
    case REMOVE_ACTIVE_USER:
      const newActiveUsers = state.activeUsers.filter((item) => item !== action.payload);
      console.log("user log out", newActiveUsers);
      return { ...state, activeUsers: newActiveUsers };

    default:
      return state;
  }
};

// Action creators
export const setAccount = (account) => ({
  type: SET_ACCOUNT,
  payload: account,
});

export const setChatPerson = (chatPerson) => ({
  type: SET_CHAT_PERSON,
  payload: chatPerson,
});

export const logOut = (id) => ({
  type: LOGOUT,
  payload: id,
});

export const addActiveUser = (activeUserSet) => ({
  type: ADD_ACTIVE_USER,
  payload: activeUserSet,
});

export const removeActiveUser = (activeUserSet) => ({
  type: REMOVE_ACTIVE_USER,
  payload: activeUserSet,
});

export default accountReducer;
