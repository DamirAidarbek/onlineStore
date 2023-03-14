import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: [],
    cart: [],
    isLoading: false
  },
  reducers: {

  }
})