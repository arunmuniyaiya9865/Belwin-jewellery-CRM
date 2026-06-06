import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
      state.loading = false
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
    }
  }
})

export const { loginStart, loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
