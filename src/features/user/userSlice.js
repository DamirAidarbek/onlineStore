import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    cart: [],
    isLoading: false,
    formType: '',
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
    toggleShow: (state, { payload }) => {
      state.showForm = payload
    }
  }
})

export const { addItemToCart, toggleShow } = userSlice.actions

export default userSlice.reducer