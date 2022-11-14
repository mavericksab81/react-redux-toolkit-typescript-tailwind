import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import signInFirebase from "../../utils/firebase/firebase.utils";
import { User } from "./user.interface";

export interface AuthState {
    user: User;
}

const initialState: AuthState = {
    user: {
        email: '',
        token: '',
        isAuthenticated: false
    }
}

export const loginUser: any = createAsyncThunk(
    'users/login',
    async({ username, password }: any, thunkAPI) => {
      try {
          const data = await signInFirebase(username, password);
          const { email, accessToken }: any = data?.user;
        if (data?.user) {
          localStorage.setItem('token', accessToken);
            return {
              email, accessToken
          };
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } catch (e: any) {
        console.log('Error', e.response.data);
        thunkAPI.rejectWithValue(e.response.data);
      }
    }
  );

export const authSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        accessToken: '',
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    },
    reducers: {
      clearState: (state) => {
          state.isError = false;
          state.isSuccess = false;
          state.isFetching = false;
          state.email = '';
          state.accessToken = '';
          state.errorMessage = '';
        return state;
      },
    },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state: any, { payload }: any) => {
        state.email = payload.email;
        state.accessToken = payload.accessToken;
        state.isFetching = false;
        state.isSuccess = true;
        return state;
    })
      .addCase(loginUser.rejected, (state: any, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload?.message || "Invalid username or password.";
      })
      .addCase(loginUser.pending, (state: any, { payload }: any) => {
        state.isFetching = true;
      })
    },
  });

export const { clearState } = authSlice.actions;
export const selectUser = (state: RootState | any) => state.user;

export default authSlice.reducer;