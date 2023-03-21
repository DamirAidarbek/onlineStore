import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { BASE_URL } from '../../utills/constants'

export const createUser = createAsyncThunk(
  'user/createUser',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, payload)

      return res.data
    } catch (err) {
      console.log(err)
      thunkAPI.rejectWithValue(err)
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/createUser',
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload)

      return res.data
    } catch (err) {
      console.log(err)
      thunkAPI.rejectWithValue(err)
    }
  }
)

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/auth/login`, payload)
      console.log(data)
      const login = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        "Authorization": `Bearer ${data.access_token}`
      }
      })

      return login.data
    } catch (err) {
      console.log(err)
      thunkAPI.rejectWithValue(err)
    }

  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    cart: [],
    isLoading: false,
    formType: 'signUp',
    showForm: false
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
      const found = state.cart.find(item => item.id === payload.id)

      if (found) {
        found.quantity += 1
      } else {
        state.cart.push({...payload, quantity: 1})
      }
    },
    removeItem: (state, { payload }) => {
      state.cart = state.cart.filter(({ id }) => id !== payload)
    },
    toggleShow: (state, { payload }) => {
      state.showForm = payload
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload
    },
    minusItem: (state, { payload }) => {
      const finded = state.cart.find(({ id }) => id === payload)
      if (finded.quantity > 1) {
        finded.quantity -= 1
      }
    }
  },
  extraReducers: {
    [createUser.fulfilled]: (state, { payload }) => {
      state.currentUser = payload
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.currentUser = payload
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.currentUser = payload
    }
  }
})

export const { addItemToCart, toggleShow, toggleFormType, removeItem, minusItem } = userSlice.actions

export default userSlice.reducer