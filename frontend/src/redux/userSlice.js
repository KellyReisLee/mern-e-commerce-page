import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  isFetching: false,
  message: null,
  error: null

}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true

    },
    loginSuccess: (state, action) => {
      state.isFetching = false
      state.currentUser = action.payload

    },
    loginSuccessMessage: (state, action) => {
      state.isFetching = false
      state.message = action.payload

    },
    loginFailure: (state, action) => {
      state.isFetching = false
      state.error = action.payload

    },
    logout: (state) => {
      state.currentUser = null;
    },

  }
})


//______ Selector_____
export const selectorCurrentUser = (state) => state.user.currentUser
export const selectorIsFetching = (state) => state.user.isFetching;
export const selectorError = (state) => state.user.error;
export const selectorMessage = (state) => state.user.message;



export const { loginStart, loginSuccess, loginFailure, loginSuccessMessage, logout } = userSlice.actions;
export default userSlice;