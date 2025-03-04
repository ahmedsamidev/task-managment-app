import axiosInstance from "@/src/utils/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


const saveToLocalStorage = (user: AuthState["user"]) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeFromLocalStorage = () => {
  localStorage.removeItem("user");
};

const getUserFromLocalStorage = () => {
  if (typeof window === 'undefined') {
    return ""
}
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};


interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  user: {
    email: string;
    id: string;
  } | null;
}


const initialState: AuthState = {
  isLoggedIn: !!getUserFromLocalStorage(),
  loading: false,
  error: null,
  user: getUserFromLocalStorage(),
};


export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email: credentials.email,
        password: credentials.password,
      });
      return { user: response.data.user };
    } catch (error: Error | unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  },
);


export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout", {});
      return { success: true };
    } catch (error: Error | unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || "Logout failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 📌 Login
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<{ user: AuthState["user"] }>) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        saveToLocalStorage(action.payload.user); 
      },
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

 
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
      removeFromLocalStorage(); 
    });
  },
});

export default authSlice.reducer;
