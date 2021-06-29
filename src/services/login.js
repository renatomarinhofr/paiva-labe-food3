import axios from "axios";
import { BASE_URL } from "../constants/urls";

export const login = async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, body);

    const { token } = response.data;
    const { hasAddress } = response.data.user;

    return {
      token,
      hasAddress,
      status: true,
    };
  } catch (error) {
    const { message } = error.response.data;

    return {
      message,
      status: false,
    };
  }
};
