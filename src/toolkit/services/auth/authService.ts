import axios from "axios";
import Cookies from 'js-cookie';

import { config } from "../../../../Constants";

const API_URL = `${config.url}/api`;
export type SignupFormData = {
  username: string;
  password: string;
};
export type User ={
    username: string
    _id:string
}
const signup = async (userData: SignupFormData) => {
  const res = await axios.post(`${API_URL}/signup`, userData,{headers:{ 'Content-Type' : 'application/json'},withCredentials:true});
  console.log(res);
  return {
    user : res.data.user,
    accessToken: Cookies.get("access_token"),
    message : res.data.message,
  }
};

const login = async (userData: SignupFormData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  console.log(res);
  return {
    user : res.data.user,
    accessToken: Cookies.get("access_token"),
    message : res.data.message,
  }
};

// user logout service
const logout = () => {
  Cookies.remove('access_token');
};

const authService = {
  signup,
  login,
  logout,
};
export default authService;
