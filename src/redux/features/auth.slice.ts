import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  email: string,
  token: string | null,
  image: string | null
}
const initialState: AuthState = JSON.parse(sessionStorage.getItem("auth-data") || '{}') || {
  email: "",
  token: null,
  image: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      state.email = action.payload
      sessionStorage.setItem("auth-data", JSON.stringify(state))
    },
    clearAuth: (state) => {
      state.email = ""
      sessionStorage.removeItem("auth-data") 
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload
      localStorage.setItem("token", (state.token  || ""))
    },
    setImageUrl: (state, action: PayloadAction<string | null>) => {
      state.image = action.payload
    }
  },
})

export const { clearAuth, setAuth, setToken, setImageUrl } = authSlice.actions

export default authSlice.reducer
