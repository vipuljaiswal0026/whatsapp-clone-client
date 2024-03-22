import axios from "axios";

const url = import.meta.env.VITE_URL;

export const addUser = async (data) => {
  try {
    await axios.post(`${url}/adduser`, data);
  } catch (error) {
    console.log(`Error while add user: ${error}`);
  }
};

export const getUsers = async () => {
  try {
    let response = await axios.get(`${url}/users`);
    return response.data;
  } catch (error) {
    console.log(`Error while getUsers Api: ${error}`);
  }
};

export const addConversation = async (data) => {
  try {
    await axios.post(`${url}/conversation/add`, data);
  } catch (error) {
    console.log(`Error while adding conversation ${error}`);
  }
};

export const getConversation = async (data) => {
  try {
    let response = await axios.post(`${url}/conversation/get`, data);
    const conversation = response.data;
    return conversation;
  } catch (error) {
    console.log(`Error while getting conversation ${error}`);
  }
};

export const sendMessage = async (data) => {
  try {
    await axios.post(`${url}/messages/add`, data);
  } catch (error) {
    console.log(`Error while send Message Api ${error}`);
  }
};

export const getMessages = async (conversationId) => {
  try {
    let response = await axios.get(`${url}/messages/get/${conversationId}`);
    return response.data;
  } catch (error) {
    console.log("error while calling get message api", error.message);
  }
};

export const uploadFile = async (data) => {
  try {
    return axios.post(`${url}/file/upload`, data);
  } catch (error) {
    console.log("error while calling uploadFile api", error.message);
  }
};

export const getPresignedUrl = async (key) => {
  try {
    // Fetch presigned URL from the backend
    const response = await axios.get(`${url}/file/getUrl/${key}`);
    return response.data;
  } catch (error) {
    console.log("error while calling uploadFile api", error.message);
  }
};
