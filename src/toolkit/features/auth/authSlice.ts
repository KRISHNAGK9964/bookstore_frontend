import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth/authService";
import { User} from "../../services/auth/authService";
import axios from "axios";
import { config } from "../../../../Constants";
import Cookies from "js-cookie";

const API_URL = `${config.url}/api`;

interface xyz {
    user : null | User,
    accessToken : null | string | undefined,
    error: string | null | undefined | unknown,
    success : boolean,
    loading : boolean,
    message: string | null;
}
const access_token = Cookies.get("access_token");
console.log(access_token);

const initialState : xyz = {
  user: null,
  accessToken: access_token || "",
  error: null,
  success: false,
  loading: false,
  message: "",
};

export const signup = createAsyncThunk("auth/signup", async (user: { username: string; password: string }, thunkAPI) => {
  try {
    // const response = await authService.signup(user as any);
    const res = await axios.post(`${API_URL}/signup`, user,{headers:{ 'Content-Type' : 'application/json'},withCredentials:true});
    console.log(res);
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    } else {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
});

export const login = createAsyncThunk("/login", async (credentials: { username: string; password: string }, thunkAPI) => {
  try {
    // const response = await authService.login(user as any);
    const res = await axios.post(`${API_URL}/login`, credentials,{headers:{ 'Content-Type' : 'application/json'},withCredentials:true});
    console.log(res);
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    } else {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
});

// user logout
export const logout = createAsyncThunk("/logout", async (_, thunkAPI) => {
  try {
    authService.logout();
  } catch (error: any) {
    const message = error.response.data.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message = "Error" ;
        state.user = null;
        state.accessToken = null;
      })
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.message = "Error";
        state.user = null;
        state.accessToken = null;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.accessToken = null;
      });
  },
});

// export const { reset} = authSlice.actions;
export default authSlice.reducer;